# LED Rock Climbing Wall

### Motivation

Outdoor rock climbing is a sport where the objective is to get to the top of the mountain using only your hands and feet. Indoor rock climbing is quite similar apart from the fact that you are climbing on artificial rock. This is usually fine, however sometimes there are too many holds placed very close together and it becomes hard to tell which ones you are supposed to use. That is the problem this project aims to solve. By placing LEDs under each hold and being able to choose which LEDs turn on using a mobile app it would become much easier to tell which holds you are supposed to grab onto. Apart from showing you the holds you are using, you would also be able to create new boulders (rock climbing jargon for climbing paths) and save them for other users to try out and climb themselves. While a product like this already exists, called [The Moon Board](https://www.moonboard.com/moonboard-app), it only works for a standardized climbing wall with a grid layout. My aim is to make a system that would work on any climbing wall, even if the holds are not arranged in a regular pattern.



<img src="https://github.com/Zlatanius/LED-Rock-Climbing-Wall-RN-project/blob/master/README_media/67db305f22acc48a82f4be2c9dd4c3e4.jpg?raw=true" height="650" />

<p style="text-align: center;">Example of a the moon board climbing wall.</p>



## Warnings

- This project is still very young. This means that it only has basic functionality and bare minimum of styling.
- This project has only been tested on android and there are no guarantees it works on iOS.
- All information is subject to change.



## Setup

This project consists of two parts, the mobile app and the hardware. This is only a repository for the mobile app part. The code and documentation for the hardware can be found at this [link](https://github.com/Zlatanius/LED-Rock-Climbing-Wall-arduino-code).



## Installation

This project has to be run on a physical device as the emulators do not have bluetooth support.

This is a regular react Native project and should work by only running `npm install`:

```
npm install
react-native run-android
```

If there are problems running the app I would recommend trying to use the `gradlew clean` command:

```
cd android
./gradlew clean
cd ../
react-native run-android
```



## Used Libraries

- Redux
- Redux thunk
- React native navigation
- [react-native-bluetooth-classic](https://github.com/kenjdavidson/react-native-bluetooth-classic)
  - This is a great bluethooth library that allows you to use bluetooth classic on both android and iOS.



## Functionality

Currently there are two ways to control an LED matrix, the grid controller and the touch pad controller. 

**Connect device screen:** this is the first screen of the app. This screen displays the paired devices and allows you to connect to a device of your choice, or disconnect from the device you are currently connected to. It also presents basic information about each device and the connected status.

<img src="https://github.com/Zlatanius/LED-Rock-Climbing-Wall-RN-project/blob/master/README_media/Screenshot_2020-05-11-15-05-24.png?raw=true" height="650" />



**Manual message screen:** this screen allows you to manually send messages to a device you are connected to. It is mostly used for testing.

<img src="https://github.com/Zlatanius/LED-Rock-Climbing-Wall-RN-project/blob/master/README_media/Screenshot_2020-05-11-15-08-38.png?raw=true" height="650" />



**The grid controller** is intended to be used when the holds are arranged in a grid pattern. It is pretty simple as it consists of a grid layout that corresponds to the holds on the wall. You can select holds by pressing on the corresponding grid tile and unselect it by pressing it again. Once selected the correspondig hold will light up. The reset button will unselect all holds.

<img src="https://github.com/Zlatanius/LED-Rock-Climbing-Wall-RN-project/blob/master/README_media/Grid%20controller%20without%20backgound.jpg" height="650" />

In the grid controller you can also add a boudler from the official moonboard app and set it as a background for the grid. By pressing the "PICK BOUDLER" button an image picker screen will open. Here you need to crop the screenshot so only the hollds remain.

<img src="https://github.com/Zlatanius/LED-Rock-Climbing-Wall-RN-project/blob/master/README_media/Image%20picker.jpg" height="650" />

After this is done the holds from the image will align with holds on the controller and you can easily slecet the correct holds rather than having to switch between apps.

<img src="https://github.com/Zlatanius/LED-Rock-Climbing-Wall-RN-project/blob/master/README_media/Grid%20controller%20with%20background.jpg" height="650" />

**Touch pad controller** is intended for walls with irregularly placed holds. It utilizes the fact that all the LEDs are connected in series (only the signal lines are in series) and effectively results in the whole matrix acting as a long chain of LEDs. This control mode works by essentially letting the user move the selected LED along the chain and selecting the hold they wish to use. By scrolling right on the touch pad the selected LED moves to the right, and by scrolling left it moves to the left.

<img src="https://github.com/Zlatanius/LED-Rock-Climbing-Wall-RN-project/blob/master/README_media/Screenshot_2020-05-11-14-39-24.png?raw=true" height="650" />



## Example

By nature this project is hard to explain in words, so here are a couple of videos to better understand what and how the system works.



#### Grid Controller:

![Grid contoller example](https://media.giphy.com/media/EkKHw46r6m3EA10P8W/giphy-downsized-large.gif)



#### Touch pad controller:

![Touch contoller example](https://media.giphy.com/media/wQxN1a9Km3QZELKSLA/giphy-downsized-large.gif)





## Finished version

Here is a couple of pictures and videos of the Moonboard in our local gym with the system installed (the LEDs are much easier to see on real life).



<img src="https://github.com/Zlatanius/LED-Rock-Climbing-Wall-RN-project/blob/master/README_media/IMG_20201027_222226.jpg?raw=true?raw=true" height="650" />



![Touch example](https://media.giphy.com/media/80lsQBUuwxX08EevT3/giphy-downsized.gif)





## Future Plans

- As previously stated almost no styling work has been done on this project, so that will definitely have to be done
- The Touch controller will be able to change the scrolling speed based on the y coordinates of the users finger. The higher the finger on the touch pad the faster it scrolls.
- Users will be able to save and load created boulders (climbing paths). The hardware already has an SD card module and is capable of reading boulders from it by manually sending text commands over bluetooth. However there is still no way of previewing the boulders on your phone.
