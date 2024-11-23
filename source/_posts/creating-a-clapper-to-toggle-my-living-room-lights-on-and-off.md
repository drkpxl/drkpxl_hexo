---
title: "Engineering a Clapper to Toggle My Living Room Lights On and Off"
slug: "creating-a-clapper-to-toggle-my-living-room-lights-on-and-off"
date: "2024-10-05"
lastmod: "2024-10-07"
tags: []
description: "nan"
---

# Building a Modern Clapper: An ESP32 Adventure

My daughter and I were walking to school the other day when she asked, "How can clapping turn lights on and off?" I explained about the Clapper, a device that controls power with sound. Curious about her question's origin, I learned she'd seen it on an episode of Gabi's Dollhouse. 

Inspired, I told her, "I could probably build one for you. It'd be a lot easier than saying 'Hey Siri, turn the living room lights on' and having Siri fail half the time."

Life got busy, but a few weeks later, I finally bought some I2S microphones and wired them up to an ESP32. Time to start coding!

## Initial Setup and Testing

First things first: I verified the wiring and wrote some basic code to test the setup. I programmed the ESP32's built-in LED to light up when it detected sound. Using the serial plotter, I got a sense of the ambient noise levels in our house and how loud a typical clap is.

## Fine-Tuning the Clap Detection

Surprisingly, accurately detecting a clap—with its quick attack and decay against background noise—proved challenging. Here's a snippet of the code defining the key parameters:

```cpp
// Clap detection thresholds and settings
#define SPIKE_THRESHOLD 10000  // Raw threshold for detecting a spike in amplitude
#define DECAY_THRESHOLD 2000   // Threshold for detecting decay after a spike
#define DECAY_TIME 100         // Time window for decay in milliseconds
#define TIME_WINDOW 3000       // 3 seconds to detect two claps
```

These values work well for our home's noise floor and our clapping style. In hindsight, wiring up some potentiometers for on-the-fly adjustments might have been useful. But for now, this setup does the job nicely.

## Integrating with Home Assistant

With clap detection working, the next step was integrating it with Home Assistant to control our Hue lights. As an MQTT enthusiast, I found it effortless to send boolean true/false values to my MQTT server when claps were detected, leveraging the ESP32's built-in Wi-Fi capabilities.

```yaml
alias: Set Clap Threshold
triggers:
  - entity_id: input_number.clap_threshold
    trigger: state
actions:
  - data_template:
      topic: sensors/clapper/set_threshold
      payload: "{{ states('input_number.clap_threshold') | int }}"
    action: mqtt.publish
```

```yaml
alias: Living Room Clapper
description: MQTT to Clapper
mode: single
triggers:
  - topic: sensors/clapper
    payload: "true"
    trigger: mqtt
conditions: []
actions:
  - type: toggle
    device_id: d03042911c70a85917fdff8105386f66
    entity_id: 6c9b9ad90fb60187c20f31d1a29ea71f
    domain: light

```

Setting up the automation in Home Assistant was trivial, and voilà! We had a functioning clapper!

## The Result

All in all, this project took just a few hours to complete. It brings joy to my daughter, nostalgia to me, and offers a welcome alternative to struggling with Siri's interpretation of my New York accent.

## Next Steps

The next phase will be designing and 3D printing a box to contain the wires and microphone. For now, though, it's happily hidden behind our living room TV.

If you try this project yourself, I'd love to hear about it! Drop a comment below or reach out on social media.

Happy clapping!

## Complete ESP32 Code

```Cpp
#include <WiFi.h>
#include <PubSubClient.h>
#include "driver/i2s.h"
#include <math.h>

// Wi-Fi credentials and hostname
const char* ssid = "XXXX";
const char* password = "XXXX";
const char* hostname = "Clapper";  // Choose any name you like

// MQTT server settings with authentication
const char* mqtt_server = "XXXX";
const int mqtt_port = 1883;                  // Default MQTT port
const char* mqtt_username = "mqtt";          // MQTT username
const char* mqtt_password = "XXXX";  // MQTT password
const char* mqtt_topic = "sensors/clapper";  // MQTT topic to publish to

WiFiClient espClient;
PubSubClient client(espClient);

#define LED_PIN 2  // Built-in LED pin (usually GPIO 2 on ESP32)

// I2S settings for microphone
#define I2S_WS 15        // Word Select (LRCLK)
#define I2S_SCK 14       // Clock (BCLK)
#define I2S_SD 32        // Serial Data (DOUT)

#define SAMPLE_RATE 16000
#define SAMPLES 1024     // Number of samples to read in each block

// Clap detection thresholds and settings
#define SPIKE_THRESHOLD 10000  // Raw threshold for detecting a spike in amplitude
#define DECAY_THRESHOLD 2000   // Threshold for detecting decay after a spike
#define DECAY_TIME 100         // Time window for decay in milliseconds
#define TIME_WINDOW 3000       // 3 seconds to detect two claps

bool first_clap_detected = false;
bool clap_active = false;
unsigned long first_clap_time = 0;  // Time when the first clap was detected
unsigned long last_clap_reset_time = 0; // Time when MQTT was last reset

// Function to connect to Wi-Fi
void setup_wifi() {
  delay(10);
  Serial.println();
  Serial.print("Connecting to ");
  Serial.println(ssid);

  // Set ESP32 hostname
  WiFi.setHostname(hostname);

  WiFi.begin(ssid, password);

  while (WiFi.status() != WL_CONNECTED) {
    delay(500);
    Serial.print(".");
  }

  Serial.println("");
  Serial.println("WiFi connected");
  Serial.println("IP address: ");
  Serial.println(WiFi.localIP());
}

// Callback function for MQTT (optional, not used in this case)
void callback(char* topic, byte* payload, unsigned int length) {
  // Handle any incoming messages from the MQTT server (if needed)
}

// Function to reconnect to the MQTT server if the connection is lost
void reconnect() {
  while (!client.connected()) {
    Serial.print("Attempting MQTT connection...");
    // Attempt to connect with username and password
    if (client.connect("ESP32Client", mqtt_username, mqtt_password)) {
      Serial.println("connected");
      // Publish initial "false" message at boot
      client.publish(mqtt_topic, "false");
    } else {
      Serial.print("failed, rc=");
      Serial.print(client.state());
      Serial.println(" try again in 5 seconds");
      delay(5000);
    }
  }
}

// Detect a sharp spike followed by a decay within a time window
bool detect_clap(int16_t* samples, int num_samples) {
  for (int i = 1; i < num_samples; i++) {
    int32_t diff = abs(samples[i] - samples[i - 1]);

    // If a sharp spike is detected
    if (diff > SPIKE_THRESHOLD) {
      unsigned long spike_time = millis();

      // Look for decay after the spike
      for (int j = i + 1; j < num_samples; j++) {
        if (abs(samples[j]) < DECAY_THRESHOLD) {
          unsigned long decay_time = millis() - spike_time;
          
          if (decay_time < DECAY_TIME) {
            Serial.println("Clap detected!");
            return true;  // Clap detected if decay happens quickly
          }
          break;
        }
      }
    }
  }

  return false;  // No clap detected
}

void setup() {
  Serial.begin(115200);
  pinMode(LED_PIN, OUTPUT);
  digitalWrite(LED_PIN, LOW);  // Turn off LED initially

  // Connect to Wi-Fi
  setup_wifi();
  
  // Set up the MQTT client
  client.setServer(mqtt_server, mqtt_port);
  client.setCallback(callback);

  // Configure I2S
  i2s_config_t i2s_config = {
    .mode = i2s_mode_t(I2S_MODE_MASTER | I2S_MODE_RX),
    .sample_rate = SAMPLE_RATE,
    .bits_per_sample = I2S_BITS_PER_SAMPLE_16BIT,
    .channel_format = I2S_CHANNEL_FMT_ONLY_LEFT,
    .communication_format = i2s_comm_format_t(I2S_COMM_FORMAT_I2S),
    .intr_alloc_flags = 0, // default interrupt priority
    .dma_buf_count = 8,
    .dma_buf_len = 64,
    .use_apll = false
  };

  i2s_pin_config_t pin_config = {
    .bck_io_num = I2S_SCK,   // Serial Clock (SCK)
    .ws_io_num = I2S_WS,     // Word Select (WS/LRCLK)
    .data_out_num = -1,      // Not used for output (we're just receiving)
    .data_in_num = I2S_SD    // Serial Data input
  };

  // Install and start I2S driver
  i2s_driver_install(I2S_NUM_0, &i2s_config, 0, NULL);
  i2s_set_pin(I2S_NUM_0, &pin_config);
  i2s_set_clk(I2S_NUM_0, SAMPLE_RATE, I2S_BITS_PER_SAMPLE_16BIT, I2S_CHANNEL_MONO);
}

void loop() {
  // Reconnect to MQTT if needed
  if (!client.connected()) {
    reconnect();
  }
  client.loop();

  int16_t i2s_data[SAMPLES];  // Buffer for the audio data
  size_t bytes_read;
  
  // Read I2S data
  i2s_read(I2S_NUM_0, (char *)i2s_data, sizeof(i2s_data), &bytes_read, portMAX_DELAY);
  
  unsigned long current_time = millis();

  // Detect sharp transitions and register claps
  if (detect_clap(i2s_data, SAMPLES)) {
    if (!first_clap_detected) {
      // First clap detected
      first_clap_detected = true;
      first_clap_time = current_time;
      Serial.println("First clap detected!");
      client.publish(mqtt_topic, "true");  // Send MQTT message
      clap_active = true;  // Set clap active flag
    } else if (first_clap_detected && (current_time - first_clap_time) < TIME_WINDOW) {
      // Second clap detected within the time window
      digitalWrite(LED_PIN, HIGH);
      Serial.println("Second clap detected! LED ON.");
      client.publish(mqtt_topic, "true");  // Send MQTT message
      clap_active = true;  // Set clap active flag
      
      // Reset the system after detection
      first_clap_detected = false;
      delay(3000);  // Keep LED on for 3 seconds
      digitalWrite(LED_PIN, LOW);
      Serial.println("LED OFF.");
    }
  }

  // Reset if too much time has passed since the first clap
  if (first_clap_detected && (current_time - first_clap_time) > TIME_WINDOW) {
    first_clap_detected = false;
    Serial.println("Timeout: First clap ignored, resetting.");
  }

  // Reset MQTT to "false" after 3 seconds of no clap activity
  if (clap_active && (current_time - first_clap_time) > 3000) {
    client.publish(mqtt_topic, "false");  // Reset to false
    clap_active = false;  // Clear clap active flag
    Serial.println("Clap reset, MQTT set to false.");
  }

  delay(50);  // Small delay to avoid flooding the serial monitor
}
```

## Wiring Diagram for my Particular ESP32 Board

![ESP-WROOM-32 ESP32 ESP-32S](https://bear-images.sfo2.cdn.digitaloceanspaces.com/drkpxl/ac-1.webp)


## Functioning Setup

some video ehre



