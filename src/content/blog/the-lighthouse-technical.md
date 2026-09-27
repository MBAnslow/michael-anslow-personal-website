---
title: "The Lighthouse — Building the Scenes"
subtitle: "The taxi, rotating beacon and blackout effects"
description: "How we translated three scenes from The Lighthouse into spatial light, sound and Godot animations."
pubDate: 2026-02-26
tags:
  - "creative technology"
  - "godot"
  - "lighting"
hero: "/media/blog/lighthouse-candle.webp"
heroAlt: "Players gathered around a warm candle-like light after the Lighthouse blackout."
sourceURL: "https://mbanslow.github.io/funiki-website/Creation/The-Lighthouse/Scenes/"
series: "The Lighthouse"
seriesPart: 3
partTitle: "Building the Scenes"
featured: false
draft: false
---

Once the [story](../the-lighthouse/) and [physical setup](../the-lighthouse-setup/) were in place, we translated Guillaume Boulliard’s storyboard into scenes in Funiki. The most successful effects were technically simple enough to read immediately, but spatial enough to make the room feel active.

## The taxi

The opening taxi journey gave the players time to discover their characters while the world established its rhythm around them. The sequence moved through four lighting states:

1. Warm street lights periodically passed the group as the taxi travelled at night.
2. Bright white headlights illuminated the players when they stepped out.
3. Red tail lights washed over them and faded as the taxi drove away.
4. Cool blue light remained, establishing the village at night.

The virtual scene required little more than a faint directional light overhead and two animated spotlights moving past the group. The changing colour, direction and accompanying engine sound did most of the narrative work.

The movement was intentionally abstract. No image of a road or vehicle was shown, but the repeated sweep of light gave the players a rhythm they could interpret as travel.

<figure class="article-video">
  <div class="article-video__frame">
    <iframe src="https://drive.google.com/file/d/1ZGwU75btxEWvTu5gFYKhvgjYViX4rj2R/preview" title="Taxi scene from The Lighthouse demo" loading="lazy" allow="autoplay; encrypted-media; picture-in-picture" allowfullscreen></iframe>
  </div>
  <figcaption><strong>Taxi scene.</strong> The adventurers travel at night, pass street lights and watch the taxi depart.</figcaption>
</figure>

The following tethering view shows the same keyframe animation from inside Funiki. Outputs sent to the physical lights are grouped on the left and inputs sampled from the virtual sphere on the right, arranged to make the movement across the room easier to follow.

<figure class="article-video">
  <div class="article-video__frame">
    <iframe src="https://drive.google.com/file/d/1x33zqI9j947S8majF7qwKZO22rt01vwZ/preview" title="Taxi scene light tethering in Funiki" loading="lazy" allow="autoplay; encrypted-media; picture-in-picture" allowfullscreen></iframe>
  </div>
  <figcaption><strong>Taxi light tethering.</strong> The virtual spotlights pass the centre and then travel along either side of the group.</figcaption>
</figure>

## Approaching the lighthouse

Outside the lighthouse, dark blue perimeter light represented the coast at night while a white overhead source suggested moonlight.

The rotating beacon was built with a keyframe animation. Surrounding lights changed to white at staggered times, making a beam appear to move across the physical room. Guillaume paired it with an abstract sound that gave each pass its own presence and hinted that there was something unusual about the lighthouse.

When the players knocked, a steady amber light opened on one side of the room like an interior doorway. The cold moving beam continued to cross that warmer light, making the threshold feel like a boundary between two places.

<figure class="article-video">
  <div class="article-video__frame">
    <iframe src="https://drive.google.com/file/d/1lJlm7FLotH5myG4u1Efm3aoVnlsJEBA9/preview" title="Lighthouse beam and door-opening scene" loading="lazy" allow="autoplay; encrypted-media; picture-in-picture" allowfullscreen></iframe>
  </div>
  <figcaption><strong>Lighthouse beam and opening door.</strong> Two rotations of the beacon are followed by the warm doorway and a final sweep of white light.</figcaption>
</figure>

<div class="article-gallery" aria-label="The Lighthouse scene lighting gallery">
  <a href="../../media/blog/lighthouse-blue.webp" target="_blank">
    <img src="../../media/blog/lighthouse-blue.webp" alt="Players silhouetted by deep blue night lighting." loading="lazy" />
    <span>Cool perimeter light establishes the coast at night.</span>
  </a>
  <a href="../../media/blog/lighthouse-candle.webp" target="_blank">
    <img src="../../media/blog/lighthouse-candle.webp" alt="Players gathered around a warm flickering lamp." loading="lazy" />
    <span>A local warm source becomes the party’s torch.</span>
  </a>
  <a href="../../media/blog/lighthouse-red.webp" target="_blank">
    <img src="../../media/blog/lighthouse-red.webp" alt="Players surrounded by intense red light." loading="lazy" />
    <span>Red light signals that the restored power is not normal.</span>
  </a>
</div>

## Lights out

Inside the lighthouse, a low electrical hum and occasional flickers primed the players to notice the lighting system. The flickering then became increasingly unstable before every electric light cut out at once.

<figure class="article-video">
  <div class="article-video__frame">
    <iframe src="https://drive.google.com/file/d/1iDgLLykL3HFO-cEIKlLhuVPr2TTzXTWk/preview?usp=drivesdk" title="Lights-out and torch scene from The Lighthouse demo" loading="lazy" allow="autoplay; encrypted-media; picture-in-picture" allowfullscreen></iframe>
  </div>
  <figcaption><strong>Lights out.</strong> The electrical system fails and the adventurers continue by the light of their torch.</figcaption>
</figure>

The effect was controlled programmatically in Godot. Several lights were placed around the centre of the virtual scene, and each varied its attenuation during short bursts: `0` for normal light, between `-0.1` and `-1.0` for a flicker, and `10` for off. Attenuation controls how light falls off over distance, so increasing it lets less light reach the Lambertian sphere from which the tethered physical lights sample their values. Godot also permits negative attenuation, which makes a light brighter.

The system exposed controls for:

- the minimum and maximum delay between bursts;
- the duration of each burst;
- the number of flickers within it;
- the normal, flickering and switched-off attenuation values;
- and a final override that killed every light.

Most of those controls were animated with keyframes, while the code handled the irregular flicker within each phase. For the blackout, the flicker attenuation moved from `-0.1` towards `-1`, making each burst brighter and denser before every light was switched off at once.

The flickering light class is a small state machine. It waits for a randomised interval, runs a burst of evenly spaced toggles between the normal and flicker values, then returns to waiting. The kill switch overrides everything.

```csharp
using Godot;
using System;
using System.Collections.Generic;

public partial class FlickeringLight : Node
{
    // -----------------------------
    // Inspector (Exports)
    // -----------------------------

    [ExportGroup("Light list")]
    [Export] private SpotlightOnSphere[] _lights = Array.Empty<SpotlightOnSphere>();

    [ExportGroup("Boolean Control")]
    [Export] public bool ActivateFlickering = false;
    [Export] public bool KillAllLights = false;

    [ExportGroup("Time between flickers")]
    [Export] private float _minIntervalSeconds = 2f;
    [Export] private float _maxIntervalSeconds = 4f;

    [ExportGroup("Flicker Burst Properties")]
    [Export] private float _burstDurationSeconds = 0.5f;

    [Export] private int _minTogglesPerBurst = 4;
    [Export] private int _maxTogglesPerBurst = 8;

    [ExportGroup("Attenuation Values (your convention)")]
    [Export] private float _normalAttenuation = 0f;      // Normal steady value
    [Export] private float _flickerAttenuation = -1f;     // Value used during flicker phase
    [Export] private float _killedAttenuation = 10f;      // Forced-off / killed value

    [ExportGroup("Interval randomization")]
    [Export] private bool _useNormalDistributionForInterval = false;
    // If true: uses Randfn(mean, stddev) with:
    [Export] private float _intervalMeanSeconds = 3f;
    [Export] private float _intervalStdDevSeconds = 0.5f;

    // -----------------------------
    // Internal state machine
    // -----------------------------

    private enum FlickerState
    {
        Disabled,   // flicker logic off; keep lights at normal attenuation
        Waiting,    // waiting for next burst
        Bursting    // currently running a burst (toggling attenuation)
    }

    private FlickerState _state = FlickerState.Waiting;

    // Waiting state
    private float _timeSinceLastBurst = 0f;
    private float _nextBurstDelay = 0f;

    // Bursting state
    private float _burstTime = 0f;
    private readonly List<float> _flipTimes = new(); // times within burst when we toggle
    private int _nextFlipIndex = 0;
    private bool _useNormalAttenuationThisPhase = true;

    public override void _Ready()
    {
        // Start in a consistent state.
        _state = FlickerState.Disabled;
        _timeSinceLastBurst = 0f;
        _nextBurstDelay = SampleNextIntervalSeconds();

        ApplyAttenuationToAll(_normalAttenuation);
        ActivateFlickering = false; // By default the lights don't flicker.
    }

    public override void _Process(double delta)
    {
        float dt = (float)delta;

        // 1) Hard override: kill lights always wins.
        if (KillAllLights)
        {
            ApplyAttenuationToAll(_killedAttenuation);
            _state = FlickerState.Disabled; // freeze flicker logic while killed
            return;
        }

        // 2) If flickering is disabled, keep a steady value and exit.
        if (!ActivateFlickering)
        {
            ApplyAttenuationToAll(_normalAttenuation);
            _state = FlickerState.Disabled;
            return;
        }

        // If we were disabled and flicker got re-enabled, resume waiting.
        if (_state == FlickerState.Disabled)
        {
            EnterWaitingState();
        }

        // 3) Run the state machine.
        switch (_state)
        {
            case FlickerState.Waiting:
                UpdateWaiting(dt);
                break;

            case FlickerState.Bursting:
                UpdateBursting(dt);
                break;
        }
    }

    // -----------------------------
    // State updates
    // -----------------------------

    private void UpdateWaiting(float dt)
    {
        _timeSinceLastBurst += dt;

        if (_timeSinceLastBurst >= _nextBurstDelay)
        {
            StartBurst();
        }
        else
        {
            // Optional: ensure lights stay normal while waiting.
            // (If other systems can change attenuation, keep this line.
            // Otherwise you can remove it to save writes.)
            ApplyAttenuationToAll(_normalAttenuation);
        }
    }

    private void UpdateBursting(float dt)
    {
        _burstTime += dt;

        // End of burst: restore, then go back to waiting.
        if (_burstTime >= _burstDurationSeconds)
        {
            ApplyAttenuationToAll(_normalAttenuation);
            EnterWaitingState();
            return;
        }

        // Toggle phase when we pass scheduled flip times.
        // While-loop = catch-up if dt is large (lag spikes).
        while (_nextFlipIndex < _flipTimes.Count && _burstTime >= _flipTimes[_nextFlipIndex])
        {
            _nextFlipIndex++;
            _useNormalAttenuationThisPhase = !_useNormalAttenuationThisPhase;
        }

        float attenuation = _useNormalAttenuationThisPhase ? _normalAttenuation : _flickerAttenuation;
        ApplyAttenuationToAll(attenuation);
    }

    // -----------------------------
    // Transitions / helpers
    // -----------------------------

    private void StartBurst()
    {
        _state = FlickerState.Bursting;

        _burstTime = 0f;
        _nextFlipIndex = 0;

        int toggleCount = GD.RandRange(_minTogglesPerBurst, _maxTogglesPerBurst);

        // Start in the "flicker" value first (so it immediately looks like a flicker burst started).
        _useNormalAttenuationThisPhase = false;

        // Precompute evenly spaced flip times across the burst.
        _flipTimes.Clear();
        _flipTimes.Capacity = Math.Max(_flipTimes.Capacity, toggleCount);

        for (int i = 1; i <= toggleCount; i++)
        {
            // Fit on/off changes into burts time
            float t = _burstDurationSeconds * ((float)i / toggleCount);
            _flipTimes.Add(t);
        }

        // Apply first phase immediately.
        ApplyAttenuationToAll(_flickerAttenuation);
    }

    private void EnterWaitingState()
    {
        _state = FlickerState.Waiting;

        _flipTimes.Clear();

        _timeSinceLastBurst = 0f;
        _nextBurstDelay = SampleNextIntervalSeconds();

        ApplyAttenuationToAll(_normalAttenuation);
    }

    private float SampleNextIntervalSeconds()
    {
        if (_useNormalDistributionForInterval)
        {
            // Randfn(mean, stddev). Clamp to avoid negative/too-small intervals.
            float v = (float)GD.Randfn(_intervalMeanSeconds, _intervalStdDevSeconds);
            return Mathf.Max(0.05f, v);
        }
        else
        {
            // Uniform between min/max.
            return (float)GD.RandRange(_minIntervalSeconds, _maxIntervalSeconds);
        }
    }

    private void ApplyAttenuationToAll(float attenuation)
    {
        // Centralize the write so it's easy to change later (e.g., if you want per-light variance).
        foreach (var spot in _lights)
            spot.spotLightAttenuation = attenuation;
    }
}
```

## The torch

After the power failed, one warm lamp became a torch. It was implemented as an independent fixed light with a gentle flicker rather than as part of the surrounding electrical system.

The source did not need to interact with every virtual light. It already mixed with them in the physical room, and keeping it independent made the effect predictable and reusable. The sound of a match, subtle popping and warm colour made the source read as flame.

<figure class="article-figure">
  <img src="../../media/blog/lighthouse-torch.webp" alt="Two players in darkness, lit only by the warm torch lamp placed between them." loading="lazy" />
  <figcaption><strong>The torch.</strong> After the blackout, a single warm lamp between the players becomes the party’s only light&nbsp;source.</figcaption>
</figure>

Its placement mattered as much as its animation. Sitting between the players, it became an object in their shared personal space, illuminated their character cards and forced them to look past it to see one another.

## Simple systems, coordinated cues

None of these scenes depended on photorealistic simulation. Their impact came from synchronising a few legible signals:

- direction suggested movement;
- colour marked location and danger;
- rhythm gave a source behaviour;
- sound explained what the changing light represented;
- and darkness removed the physical room when it no longer supported the fiction.

The technical scenes established the intended atmosphere, but the players did not always interpret space and movement as we expected. Next: [participant feedback and what we learned](../the-lighthouse-feedback/).
