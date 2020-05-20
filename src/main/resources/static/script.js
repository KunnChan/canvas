
$(document).ready(function() {

    const canvas = document.getElementById('canvas');
    const ctx = canvas.getContext('2d');

    loadData();

    const BB=canvas.getBoundingClientRect();
    let offsetX=BB.left;
    let offsetY=BB.top;

    canvas.onmouseup = myMouseUp;

    let action = "";
    let state = {
        x : 50,
        y : 50
    }
    let shapes = [];
    $("#btnCricle").click(function(){
        drawCircle();
    });
    $("#btnRectangle").click(function(){
        drawRactangle();
    });
    $("#btnTriangle").click(function(){
        drawTriangle();
    });

    function drawRactangle() {
        let { x, y} = state;
        const width = 120, height = 100;
        const param = {
            x, y, w: width, h: height
        }
        makeRactangle(param);
        const shape = {
            x, y, w: width, h: height, type: "ractangle"
        }
        shapes.push(shape);

        y += height + 10;
        state = { x, y }

    }

    function drawTriangle() {
        let { x, y} = state;
        makeTriangle({y})
        const shape = {
            x, y, w: 200, h: 200, type: "triangle"
        }
        shapes.push(shape);

        y += 210;
        state = { x, y }
    }

    function drawCircle() {
        let { x, y} = state;
        let radius = 60;

        makeCircle({x, y})
        const shape = {
            x: 40, y, w: radius * 2, h: radius * 2, type: "circle"
        }
        shapes.push(shape);

        y += 130;
        state = { x, y }

    }

    function makeRactangle(param) {
        const rectangle = new Path2D();
        rectangle.rect(param.x, param.y, param.w, param.h);
        ctx.fillStyle = 'coral';
        ctx.fill(rectangle);
    }

    function makeTriangle(param) {
        const d = param.y + 200;
        ctx.beginPath();
        ctx.moveTo(150, param.y);
        ctx.lineTo(150, param.y);
        ctx.lineTo(250, d);
        ctx.lineTo(50, d);
        ctx.fillStyle = 'seagreen';
        ctx.fill();
    }

    function makeCircle(param) {
        let circleY = param.y + 60;
        let radius = 60;
        const circle = new Path2D();
        circle.moveTo(param.x, param.y);
        circle.arc(100, circleY, radius, 0, 2 * Math.PI);
        ctx.fillStyle = 'gold';
        ctx.fill(circle);
    }

    function cut(shape) {
        const x = shape.w / 2 + shape.x - 5;
        const y = shape.y;
        const rectangle = new Path2D();
        rectangle.rect(x, y, 10, shape.h);
        ctx.fillStyle = 'lightblue';
        ctx.fill(rectangle);

    }

    function erase(shape) {
        ctx.clearRect(shape.x, shape.y, shape.w, shape.h);
        const index = shapes.indexOf(shape);
        shapes.splice(index, 1);
    }

    function glue(shape) {
        const type = shape.type;
        if(type === "circle"){
            makeCircle(shape);
        }else if(type === "triangle"){
            makeTriangle(shape);
        }else if(type === "ractangle"){
            makeRactangle(shape);
        }
    }

    function myMouseUp(e){
        e.preventDefault();
        e.stopPropagation();

        var mx =parseInt(e.clientX-offsetX);
        var my =parseInt(e.clientY-offsetY);

        const shape = shapes.find(shape => {
            const pw = shape.x + shape.w;
            const ph = shape.y + shape.h;
            return mx >= shape.x && mx <= pw && my >= shape.y && my <= ph;
        })
        if(shape){
            if(action === "cut"){
                cut(shape);
            }else if(action === "glue"){
                glue(shape);
            }else if(action === "erase"){
                erase(shape);
            }
        }

        action = "";

    }

    function loadData(){
        const toolsDom = document.getElementById('toolbar');
        $.ajax({
            type : "GET",
            contentType : "application/json",
            url : "/toolbars",
            dataType : 'json',
            success : function(result) {
                console.log("data ", result);
                const c = result.canvas;
                canvas.height = c.height;
                canvas.width = c.width;

                const toolbars = result.toolbars;
                toolbars.map(function(data) {
                    let btn = document.createElement("button");
                    btn.classList.add(data);
                    let key = "";
                    if("btnScissor" === data) key = "cut";
                    else if("btnEraser" === data) key = "erase";
                    else if("btnGlue" === data) key = "glue";

                    btn.addEventListener("mousedown", function(){
                        action = key;

                    })
                    append(toolsDom, btn);
                });

            },
            error : function(e) {
                alert("Error on get to api");
                console.log("ERROR: ", e);
            }
        });
    }

    function append(parent, el) {
        return parent.appendChild(el);
    }

});