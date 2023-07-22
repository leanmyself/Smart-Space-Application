# Smart Space Application
<br>
 Intending to create an Android home automation application with JS-based technologies, the React-Native, a JavaScript framework for writing real, natively rendering mobile applications for Android. With this technology stack, a smartphone provides user interaction mechanisms.
 <br><br>
 
![image](https://github.com/leanmyself/Smart-Space-Application/assets/99194388/254aa7be-8258-4a71-92ed-a1d5b3b4a667)

<br>
Each request from the user is sent to the Cloud using the smartphone application. The user's credentials are validated, and the requests are routed to Raspberry Pi, which serves as the central controller. To fulfill the user's request, specific APIs are called. When Raspberry Pi receives requests from the Cloud, it executes the commands by turning on/off the dedicated GPIO pins for the sensors that users requested. If the operation is successful, an acknowledgment of the devices' current status is sent to the Cloud.
