---
title: "The Passenger — A Collaboration with Assim Kalouaz"
subtitle: "Breath as an interface for light"
description: "Collaborating on an evidence-based art installation that translated breathing into responsive light and Pepper’s ghost illusions."
pubDate: 2026-02-06
tags:
  - "installation"
  - "awe"
  - "creative technology"
hero: "/media/blog/passenger-atmosphere.webp"
heroAlt: "The Passenger installation illuminated in blue, violet and amber light."
sourceURL: "https://mbanslow.github.io/funiki-website/Creation/passenger-collab"
featured: false
draft: false
---

*The Passenger* was a collaboration with [Assim Kalouaz](https://recreation.blue/passenger.html), who created the evidence-based art installation and psychological experiment to explore whether an artwork could elicit awe in its participants. It took place at the [École Supérieure du Digital](https://ecole-du-digital.com/). My contribution focused on the signal processing of breathing oscillations and the responsive lighting system.

The installation brought together projected imagery, spatial audio, light and two Pepper’s ghost illusions. A participant stood at its centre while their breath became a quiet control signal: inhaling and exhaling modulated the atmosphere around them.

This practical work sat alongside the psychological ideas I explore in [The Light and Dark of Awe](../the-light-and-dark-of-awe/).

## Inside the installation

Two transparent plastic screens, positioned beneath tablets and against a projected backdrop, created Pepper’s ghost illusions: a floating human figure and a suspended sphere. Four Philips Hue lights surrounded the participant, with stereo speakers placed on either side.

The projected content and sound established the wider narrative of the experiment. The lights and illusions responded to breathing, tying the participant’s internal rhythm to the installation’s external atmosphere.

<div class="article-gallery" aria-label="The Passenger photo gallery">
  <a href="../../media/blog/passenger-atmosphere.webp" target="_blank">
    <img src="../../media/blog/passenger-atmosphere.webp" alt="The Passenger installation illuminated with ambient blue and violet light." loading="lazy" />
    <span>Atmosphere — ambient lighting within the installation.</span>
  </a>
  <a href="../../media/blog/passenger-floating.webp" target="_blank">
    <img src="../../media/blog/passenger-floating.webp" alt="A floating human figure created as a Pepper's ghost illusion." loading="lazy" />
    <span>A human figure floating as a Pepper’s ghost illusion.</span>
  </a>
  <a href="../../media/blog/passenger-td.webp" target="_blank">
    <img src="../../media/blog/passenger-td.webp" alt="The TouchDesigner setup being adjusted during installation." loading="lazy" />
    <span>Tweaking the TouchDesigner setup.</span>
  </a>
  <a href="../../media/blog/passenger-world.webp" target="_blank">
    <img src="../../media/blog/passenger-world.webp" alt="The Earth shown within The Passenger installation as a reference to the overview effect." loading="lazy" />
    <span>A reference to the overview effect within the installation.</span>
  </a>
</div>

## From breath to signal

The installation was implemented in TouchDesigner. A RealSense depth camera was cropped around the participant’s chest, allowing small changes in depth to capture the oscillation of their breathing without requiring a wearable sensor.

An adaptive signal was extracted from that depth data, normalised between zero and one, and used to control different aspects of the installation. This did not need to be a clinical respiratory measurement. What mattered was a stable, smooth interpolation between peak inhalation and exhalation.

Research suggests that non-contact respiratory measurements from RGB-D cameras correlate reasonably well with chest-band measurements (Valenzuela et al., 2021). For an expressive control signal, that was more than sufficient.

## Breathing with light

On the lighting side, an OSC Out DAT sent the normalised breath signal from TouchDesigner to a small Python Flask server. The server controlled four Philips Hue lights through the Hue Entertainment API, which supports rapid updates at roughly twenty changes per second.

The server converted RGB values into the Hue system’s XY brightness colour space, rate-limited incoming updates and applied the resulting colour and brightness to every light in the entertainment configuration.

I experimented with moving-average, exponential and Kalman smoothing in Python. In the final installation, however, smoothing the breathing signal inside TouchDesigner proved simpler and more immediate to tune.

## The Python bridge

The server was assembled for a one-off installation rather than as production software. It is fragile in places, but it captures the essential bridge between OSC data and responsive light:

```python
from collections import deque
import argparse
from typing import Any, Callable, Tuple
from pythonosc import dispatcher, osc_server
from hue_entertainment_pykit import Entertainment, Streaming, Discovery
import time


def rgb_to_xyb(r: float, g: float, b: float) -> Tuple[float, float, float]:
    def to_linear(c: float) -> float:
        return c / 12.92 if c <= 0.04045 else ((c + 0.055) / 1.055) ** 2.4

    r_lin, g_lin, b_lin = map(to_linear, (r, g, b))
    x_value = 0.4124564 * r_lin + 0.3575761 * g_lin + 0.1804375 * b_lin
    brightness = 0.2126729 * r_lin + 0.7151522 * g_lin + 0.0721750 * b_lin
    z_value = 0.0193339 * r_lin + 0.1191920 * g_lin + 0.9503041 * b_lin
    denominator = x_value + brightness + z_value

    if denominator == 0:
        return 0.0, 0.0, brightness

    return x_value / denominator, brightness / denominator, brightness


def create_entertainment_stream(bridge_ip: str) -> Tuple[Streaming, Any]:
    discovery = Discovery()
    bridges = discovery.discover_bridges(bridge_ip)

    if len(bridges) == 0:
        raise RuntimeError("No Hue bridges found.")

    bridge = bridges[list(bridges)[0]]
    entertainment = Entertainment(bridge)
    configurations = entertainment.get_entertainment_configs()

    if len(configurations) == 0:
        raise RuntimeError("No Hue entertainment configuration found.")

    configuration = configurations[list(configurations)[0]]
    streaming = Streaming(
        bridge,
        configuration,
        entertainment.get_ent_conf_repo(),
    )
    streaming.start_stream()
    streaming.set_color_space("xyb")
    initialise_lights(streaming, configuration)
    return streaming, configuration


def create_handler(
    streaming: Streaming,
    configuration: Any,
    smoothing: str = "none",
) -> Callable[[str, Any], None]:
    previous_brightness: float | None = None
    moving_window = deque(maxlen=5)
    exponential_alpha = 0.8
    exponential_value = None
    kalman_estimate = 0.0
    kalman_probability = 1.0
    kalman_noise = 0.01
    kalman_process = 0.001
    last_update = 0.0
    update_interval = 1.0 / 20.0

    def smooth(value: float) -> float:
        nonlocal exponential_value
        nonlocal kalman_estimate
        nonlocal kalman_probability

        if smoothing == "moving":
            moving_window.append(value)
            return sum(moving_window) / len(moving_window)

        if smoothing == "exponential":
            exponential_value = (
                value
                if exponential_value is None
                else exponential_alpha * value
                + (1 - exponential_alpha) * exponential_value
            )
            return exponential_value

        if smoothing == "kalman":
            kalman_probability += kalman_process
            gain = kalman_probability / (kalman_probability + kalman_noise)
            kalman_estimate += gain * (value - kalman_estimate)
            kalman_probability *= 1 - gain
            return kalman_estimate

        return value

    def handle_message(address: str, *args: Any) -> None:
        nonlocal previous_brightness
        nonlocal last_update

        now = time.time()
        if now - last_update < update_interval:
            return

        red, green, blue, brightness = args
        x, y, _ = rgb_to_xyb(red, green, blue)
        smoothed_brightness = smooth(brightness)

        if smoothed_brightness != previous_brightness:
            set_all(x, y, smoothed_brightness, streaming, configuration)
            previous_brightness = smoothed_brightness
            last_update = now

    return handle_message


def set_all(x, y, brightness, streaming, configuration) -> None:
    for index in range(len(configuration.channels)):
        streaming.set_input((x, y, brightness, index))


def initialise_lights(streaming, configuration) -> None:
    set_all(0, 0, 0, streaming, configuration)


if __name__ == "__main__":
    parser = argparse.ArgumentParser(description="OSC to Hue bridge server")
    parser.add_argument("--port", type=int, default=5005)
    parser.add_argument("--bridge_ip", required=True)
    parser.add_argument(
        "--smoothing",
        choices=["none", "moving", "exponential", "kalman"],
        default="none",
    )
    arguments = parser.parse_args()

    osc_dispatcher = dispatcher.Dispatcher()
    stream, config = create_entertainment_stream(arguments.bridge_ip)
    osc_dispatcher.map(
        "/change_all_color_brightness",
        create_handler(stream, config, arguments.smoothing),
    )

    server = osc_server.ThreadingOSCUDPServer(
        ("127.0.0.1", arguments.port),
        osc_dispatcher,
    )

    try:
        server.serve_forever()
    except KeyboardInterrupt:
        server.shutdown()
```

The technical system was deliberately modest: one camera, one extracted signal and a small network bridge. What mattered was how clearly that signal connected body and environment. The participant did not operate the installation through an explicit interface; their breathing quietly became the interface.

## Reference

Valenzuela, A., Sibuet, N., Hornero, G., & Casas, O. (2021). Non-contact video-based assessment of respiratory function using an RGB-D camera. *Sensors, 21*(16), 5605. [https://doi.org/10.3390/s21165605](https://doi.org/10.3390/s21165605)
