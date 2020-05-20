## DBS Html5 canvas challenge

 by Min Kunn Chan, May 20 2020, 48 hours challenge

#### Setup
##### Maven  from [https://maven.apache.org/download.cgi](https://maven.apache.org/download.cgi)
##### Spring cli from [https://docs.spring.io/spring-boot/docs/current/reference/html/spring-boot-cli.html#cli-installation](https://docs.spring.io/spring-boot/docs/current/reference/html/spring-boot-cli.html#cli-installation)

to make it easy you can import project to your IDE 
and run main class [CanvasApplication.java]


## Steps to run
You can run in multiple methods.
#1 - Import to your IDE method
 1. Download and Extract
 2. Import to your IDE
 3. Run  [CanvasApplication.java]

#2 - Run with terminal
 1. Download and Extract
 2. Open Terminal and navigate to project folder
 3. run command => mvn clean install
 4. run command => mvn spring-boot:run

### Guide
once application is started on port 8083
you can access it @ [http://localhost:8083](http://localhost:8085/order)

##### Short description [current features]
-  the canvas size and list of toolbars are fetch from backend api
- you have 3 shapes to draw [ rectangle, triangle and circle]
- you have 3 options to edit those shapes [ cut, glue and erase it]
- once you draw it, by dragging toolbar icon (e.g. scissor icon) on shape you can see the action of it.

#### features to add
- adjustable shape by size
- movable shape by location
- limit to draw shape if it go outside of canvas frame

#### Note
If there are any issue email me @ kunnchan3@gmail.com or call me @ 98680039