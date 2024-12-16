---
title: Bambu Labs and Home Assistant iOS Notifications
date: 2024-12-15 18:23:38
tags:
    - home assistant
    - bambu labs
    - notifications
    - yaml
categories: 
    - code
    - home automation
    - 3d printing

---

I'm one of those people that keeps opening the Bambu Handy app to check that my print didn't fail either by falling breaking off the bed, a layer shift etc and it always take forever for the camera in the app to load. I am a huge user of Home Assistant and decided it was time to create an automation that would send me a still from the camera at layer 3, 50%, 75% and 99%. 

![Sample Notification](/source/images/HANotification.jpeg)  

It's pretty simple but has everything I need, what layer we are on, when it's expected to be done and of course the photo. I figured someone else may benefit from this so I am documenting the process.

## Initial Setup

Before we get started I am assuming a few things:  

1. You have Home Assistant up and running and it can be accessed externally using Cloudflare, Casa, etc.
2. You have the [Bambu Labs Add-on](https://github.com/greghesp/ha-bambulab) installed, configured and running.
3. You have the "Use image sensor camera" enabled for your printer.
![Image Sensor Toggle](/source/_posts/bambu_image_sensor.png)

## Automation Configuration  

Assuming this is all setup you should be able to go to your Home Assistant > Settings > Automation, Create an Automation. From there you need to select the 3 dots in the top right and select edit and YAML and paste the following code.

```yaml

alias: P1S Print Screenshot
description: ""
triggers:
  - trigger: numeric_state
    entity_id:
      - sensor.YOURPRINTERNAME_print_progress
    above: 50
    id: 50_percent
  - trigger: numeric_state
    entity_id:
      - sensor.YOURPRINTERNAME_print_progress
    above: 75
    id: 75_percent
  - trigger: numeric_state
    entity_id:
      - sensor.YOURPRINTERNAME_print_progress
    above: 99
    id: 99_percent
  - trigger: numeric_state
    entity_id:
      - sensor.YOURPRINTERNAME_current_layer
    above: 3
    id: layer_3
conditions: []
actions:
  - action: notify.mobile_app_YOURPHONESNAMERUNNINGTHEAPP
    metadata: {}
    data:
      title: |-
        {% if trigger.id == "layer_3" %}
          Layer 3 Started
        {% elif trigger.id == "50_percent" %}
          Print Progress: 50% Complete
        {% elif trigger.id == "75_percent" %}
          Print Progress: 75% Complete
        {% elif trigger.id == "99_percent" %}
          Print Progress: 99% Complete
        {% endif %}
      message: >-
        {{ states('sensor.YOURPRINTERNAME_print_progress') }}% complete. Layer
        {{states('sensor.YOURPRINTERNAME_current_layer') }} of {{
        states('sensor.YOURPRINTERNAME_total_layer_count') }} Estimated End: {{
        states('sensor.YOURPRINTERNAME_end_time') | as_timestamp | timestamp_custom('%I:%M
        %p') | lower }}
      data:
        image: >-
          https://YOURPUBLICURL/api/image_proxy/image.p1s_camera?token={{
          state_attr('image.YOURPRINTERNAME_camera', 'access_token') }}
mode: single
```

You will want to replace a few thing of course. I pointed them out in caps above but call them out here:

