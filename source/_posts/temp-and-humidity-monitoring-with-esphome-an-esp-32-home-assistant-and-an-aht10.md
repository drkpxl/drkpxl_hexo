---
title: "Temp and Humidity Monitoring with ESPHome, an ESP 32, Home Assistant and an AHT10"
slug: "temp-and-humidity-monitoring-with-esphome-an-esp-32-home-assistant-and-an-aht10"
date: "2024-10-17"
lastmod: "2024-11-22"
tags: [iot, apps]
description: "nan"
---

A few months ago, I bought some cheap ESP32s on Amazon. I wanted to monitor humidity in a few spots around the house. I worked with AI to write some Arduino code that did a good job of reporting data to my Home Assistant via MQTT, but it wasn't super reliable. WiFi would drop, and it sometimes had issues reconnecting. It was annoying to have to bring it to my computer to make changes, etc. So, I turned to the open-source community and found ESPHome.

ESPHome and its [homepage](https://esphome.io/) look kind of intimidating, but their search function is great, and I was able to get something working pretty quickly. I’m sharing my setup here in case you want to get up and running quickly as well. All I did on [this page](https://esphome.io/guides/getting_started_hassio) was add the plugin to my Home Assistant install.

Next, I flashed my ESP32 device from my computer using this tool: [https://web.esphome.io/](https://web.esphome.io/).

From there (and because I already had my AHT10 wired up to the ESP32 via an I2C connection), I just needed to create a YAML file with the following configuration:



```yaml
esphome:
  name: basement-enviro
  friendly_name: Basement Enviro

esp32:
  board: esp32doit-devkit-v1
  framework:
    type: arduino

# Enable logging
logger:


# Enable Home Assistant API
api:
  encryption:
    key: "XXXXX"

ota:
  - platform: esphome
    password: "XXXXX"

wifi:
  ssid: !secret wifi_ssid
  password: !secret wifi_password

  # Enable fallback hotspot (captive portal) in case wifi connection fails
  ap:
    ssid: "Basement-Enviro Fallback Hotspot"
    password: "XXXXX"

# Enable I2C bus
i2c:
  sda: GPIO21
  scl: GPIO22
  scan: true

# Enable Connected Sensors


sensor:
  - platform: aht10
    temperature:
      name: "AMS Temperature"
      filters:
        - lambda: return x * 1.8 + 32;  # Convert Celsius to Fahrenheit
        - round: 0  # Round to nearest whole number
      unit_of_measurement: "°F"
      accuracy_decimals: 0  # Ensure it's sent with 0 decimal places
    humidity:
      name: "AMS Humidity"
      filters:
        - round: 0  # Round to nearest whole number
      accuracy_decimals: 0  # Ensure it's sent with 0 decimal places
    update_interval: 60s


# Enable Bluetooth Proxy
bluetooth_proxy:
  active: true

esp32_ble_tracker:
captive_portal:
```

Because I live in America (and despite knowing the metric system is better), I had to convert the temperature to Fahrenheit so I’d have a real sense of the temperature. I also rounded to the nearest whole number for clarity on my dashboard.

After that, I kept the ESP32 connected to my computer via USB, installed the software, and saw data coming in the log.

The last step was to install the [ESP Home Add-On](https://www.home-assistant.io/integrations/esphome) in Home Assistant, and it was off to the races.

Next up, I plan on adding some automations if the humidity or temperature gets too high or low. Here are a few use cases I have in mind:

* Alert if the humidity in my 3D printer area is above 40%
* Alert if the temperature in the 3D printer area drops below 50°F

Both of these would tell me something is really wrong in my basement, and I’d want a push notification right away!

Hopefully this helps you get started as well.


