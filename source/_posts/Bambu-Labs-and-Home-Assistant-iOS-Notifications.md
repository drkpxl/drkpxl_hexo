---
title: Bambu Labs and Home Assistant iOS Notifications
date: 2024-12-15 18:23:38
description: "A Home Assistant automation to inform you of your Bambu Lab's print's health"
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

I'm one of those people who keeps opening the Bambu Handy app to check if my print has failed—whether it's falling off the bed, breaking, or experiencing a layer shift. It always takes forever for the camera in the app to load. As a huge user of Home Assistant, I decided it was time to create an automation that sends me a still image from the camera at layer 3, 50%, 75%, and 99% progress.

![Sample Notification](../images/HANotification.jpeg =400x)

It's simple but has everything I need: the current layer, estimated completion time, and, of course, the photo. I figured others might benefit from this, so I documented the process.

## Initial Setup

Before we get started, I am assuming a few things:

1. You have Home Assistant up and running and accessible externally using Cloudflare, Casa, etc.
2. You have the [Bambu Labs Add-on](https://github.com/greghesp/ha-bambulab) installed, configured, and running.
3. You have the "Use image sensor camera" enabled for your printer.
   ![Image Sensor Toggle](..//images/bambu_image_sensor.png =300x)

## Automation Configuration

Assuming this is all set up, go to **Home Assistant > Settings > Automations**, and create a new automation. Click the three dots in the top right corner, select "Edit in YAML," and paste the following code:

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
          https://YOURPUBLICURL/api/image_proxy/image.YOURPRINTERNAM_camera?token={{
          state_attr('image.YOURPRINTERNAME_camera', 'access_token') }}
mode: single
```

### Variables to Update:

1. Replace YOURPRINTERNAME with your printer's name. If you're unsure, open the Bambu Lab add-on and find the name in the top left of the configuration screen.
2. Replace YOURPHONESNAMERUNNINGTHEAPP with the name of your iPhone as seen by Home Assistant. This is typically the name listed in iOS Settings > About, but it could differ if you've renamed it.

Testing:
To test the setup, ensure an active print is running. You can manually trigger the automation by clicking the three dots in the top right corner of the automation editor and selecting "Run Actions". If everything is configured correctly, a notification should arrive.

## Wrap Up

That's all there is to it! If desired, you could extend this automation to send alerts for errors detected by the AMS, though the Handy app is already quite effective at handling those. For multiple printers, simply copy and modify the YAML for each one.

Unfortunately, YAML isn't the best for handling variables or complex actions, but it gets the job done here.

As always if you have any questions hit me up on [Blue Sky](https://bsky.app/profile/drkpxl.com) and I will do my best to answer any questions.
