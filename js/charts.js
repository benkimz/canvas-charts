/*
    * - Bar charts
    * - Pie charts
    * - Curves
    * - Moving chart
    * - Line graph
    * - Double curves
    * - Double line
*/

function f(arg){
    return parseFloat(arg);
}
function i(arg){
    return parseInt(arg);
}

class smtmath{
    sin(theta){
        theta = parseFloat(theta);
        return parseFloat(Math.sin(Math.PI * theta / 180).toFixed(4));
    }
    cos(theta){
        theta = parseFloat(theta);
        return parseFloat(Math.cos(Math.PI * theta / 180).toFixed(4));
    }
    cycx(theta, radius, midX){
        theta = parseFloat(theta); radius = parseFloat(radius); midX = parseFloat(midX);
        return (midX + (radius * mat.cos(theta)));
    }
    cycy(theta, radius, midY){
        theta = parseFloat(theta); radius = parseFloat(radius); midY = parseFloat(midY);
        return (midY + (radius * mat.sin(theta)));
    }
    floatobj(args = [0]) {
        if(!args || !(typeof(args) === "object")){
            return false;
        }else{ 
            var q = "";
            for(q in args){
                args[q] = parseFloat(args[q]);
            }
            return args;
        }
    }
    mean(data_object){
        if(!data_object || !(typeof(data_object) === "object")){
            return false;
        }else{
            var sumV = 0; var meanV = 0, q = '';
            for(q in data_object){
                sumV = parseFloat((sumV + parseFloat(data_object[q])));
            }
            return(sumV / parseInt(Object.keys(data_object).length));
        }
    }
};
const mat = new smtmath;

function hideElm(args) {
    if(args && typeof(args) === "object"){
        try{
            args.style.display = "none";
        }catch(e){
            console.log(e.message);
            return false;
        }
    }else{
        return false;
    }
}

function largest(arg) {
    if(!(typeof(arg) === "object") || !arg){
        return false;
    }else{
        var lval = parseFloat(arg[Object.keys(arg)[0]]);
        for(q in arg){
            if(parseFloat(arg[q]) > lval){
                lval = parseFloat(arg[q]);
            }
        }
        return lval;
    }
}

function drawBarChart(w, h, vardata = {})
{
    function strikeBar(warea, f = 0, h = 1, w = 1, barlabel) {
        if(!warea || !h || parseFloat(h) == 0 || !w || parseFloat(w) == 0){
            return false;
        }else{
            h = (parseFloat(warea.height) - parseFloat(h)); w = Math.abs(w);
            if(h < 0){
                h = 0;
            }
            var drw = warea.getContext("2d");
            drw.globalCompositeOperation = "source-over";
            drw.fillStyle = "#328b9e";
            drw.fillRect(f, h, w, warea.height);
            drw.restore();
            var fontVal = 0;
            if(w >= 30){
                barlabel = barlabel.substr(0, 3);
                fontVal = (0.33 * w);
            }else if( w >= 20){
                barlabel = barlabel.substr(0, 2);
                fontVal = (0.5 * w);
            }else if(w >= 10){
                barlabel = barlabel.substr(0, 1);
                fontVal = w;
            }else{
                barlabel = "";
            }
            drw.globalCompositeOperation = "source-over";
            drw.fillStyle = "#fff";
            if(fontVal !== 0){
                drw.font = parseInt(fontVal)+"px Arial";
            }
            drw.fillText("\t"+barlabel, f, (parseFloat(warea.height) - 5));
            drw.restore();
        }
    }

    function scaleMark(warea, tapeW = 25, maxH) {
        if(!warea){
            return false; //THROW ERROR
        }else{
            tapeW = parseFloat(tapeW); maxH = parseFloat(maxH);
            var vStep = parseFloat((maxH / 100)), freq = 0;
            var smrk = warea.getContext("2d");
            smrk.globalCompositeOperation = "source-over";
            smrk.fillStyle = "blue";
            smrk.font = "14px Arial";
            smrk.fillText("-%- \t\t\t\t bar-chart data analysis", 0, (0.05 * maxH));
            /*
                * - Y-pos evaluation -> (warea.height - ((pr / 100) * maxH))
            */
            smrk.lineWidth = "1"; smrk.strokeStyle = "#454845";
            smrk.moveTo(0, warea.height); smrk.lineTo(tapeW, warea.height); smrk.stroke();
            for(var pr = 0; pr <= 100; pr++){
                if(freq === 5){
                    freq++;
                    smrk.moveTo(0, (warea.height - ((pr / 100) * maxH))); 
                    smrk.lineTo((tapeW * 0.75), (warea.height - ((pr / 100) * maxH))); 
                    smrk.stroke();
                    continue;
                }
                smrk.moveTo(0, (warea.height - ((pr / 100) * maxH))); 
                smrk.lineTo((tapeW / 2), (warea.height - ((pr / 100) * maxH))); 
                smrk.stroke();
                if(freq === 10){
                    if(pr !== 100){
                        smrk.fillStyle = "blue";
                        smrk.font = "13px Arial";
                        smrk.fillText(pr+"\t", (tapeW * 0.5), (warea.height - ((pr / 100) * maxH)));
                    }
                    smrk.moveTo(0, (warea.height - ((pr / 100) * maxH))); 
                    smrk.lineTo(tapeW, (warea.height - ((pr / 100) * maxH))); 
                    smrk.stroke();
                    freq = 0;
                }
                if(pr === 100){
                    smrk.restore();
                    smrk.globalCompositeOperation = "source-over";
                    smrk.lineWidth = "1"; smrk.strokeStyle = "#888f0f";
                    smrk.moveTo(0, (warea.height - maxH));
                    smrk.lineTo(warea.width, (warea.height - maxH));
                    smrk.stroke();
                }
                freq++;
            }
        }
    }

    if(!w || !h || !(typeof(vardata) === "object"))
    {
        return false;//THROW AN ERROR
    }else
    {
        vardata = mat.floatobj(vardata);
        const barArea = document.createElement("canvas");
        const symbPatt = /%/;
        if(symbPatt.test(w))
        {
            w = w.replace('%', w);
            barArea.width = ((Math.abs(parseInt(w)) / 100) * window.innerWidth);
        }else{
            w = Math.abs(parseInt(w));
            barArea.width = w;
        }
        if(symbPatt.test(h))
        {
            h = h.replace('%', h);
            barArea.height = ((Math.abs(parseInt(h)) / 100) * window.innerHeight);
        }else{
            h = Math.abs(parseInt(h));
            barArea.height = h;
        }

        if(barArea.width == 0 || barArea == 0)
        {
            return false;
        }else{
            var backGround = barArea.getContext("2d"); 
            backGround.globalCompositeOperation = "destination-over";
            backGround.fillStyle = "lightgrey";
            backGround.fillRect(0, 0, barArea.width, barArea.height);

            /* ->DEFINE BARS AND SHADE THEM
                    * - Bar widths be equal
                    * - Bar spacing be equal
                    * - Height be determined by data. Data type -> Float
                    * - Bar width = (barArea.width / vardata.length) * 70%
                    * - Bar spacing = 2(Bar width * 30%)
            */
            var barW = (barArea.width / parseInt(Object.keys(vardata).length)), barS = 10;
            barS = (2 * (barW * 0.3));
            barW = (barW * 0.7);/* UPDATE BAR WIDTH */

            /*
                * - STRATEGY
            ______________________________________________________________________
                * - Get the largest height and compare with canvas height
                * - Largest height = 95 % of canvas height;
                * - maxH -> [95% barArea.height] 100% = largestVal
                * - Height for largest value = maxH -> 100%
                * - Height for other values = [(value * maxH) / largestVal]
            */
            var largestVal = largest(vardata), maxH = (barArea.height * 0.95);
            var initialF = 25;
            for(datlabel in vardata){
                strikeBar(barArea, initialF, ((vardata[datlabel] * maxH) / largestVal), barW, datlabel);
                initialF = parseFloat((initialF + barS + (barW * 0.50)));
            }

            /*
                * - Append scales and labels.
                * - 1: scaleMark(canvas, scalewidth, max-barheight)
            */
            scaleMark(barArea, 25, maxH);

            /*
                * - Strike a line at mean
            */
            if(!(mat.mean(vardata) === false)){
                var meanVardata = parseFloat(mat.mean(vardata));
                var mstrk = barArea.getContext("2d");
                mstrk.globalCompositeOperation = "source-over";
                mstrk.lineWidth = "0.5"; mstrk.strokeStyle = "green";
                /*
                    * - Mean height (barArea.height - ((meanVardata * maxH) / largestVal))
                */
                mstrk.moveTo(0, (barArea.height - ((meanVardata * maxH) / largestVal)));
                mstrk.lineTo(barArea.width, (barArea.height - ((meanVardata * maxH) / largestVal)));
                mstrk.stroke();
                mstrk.fillStyle = "#9b0a7d";
                mstrk.font = "12px Arial";
                mstrk.fillText("mean: "+meanVardata, (barArea.width / 2), (barArea.height - ((meanVardata * maxH) / largestVal)));
            }else{
                return false; //THROW ERROR
            }

            /*
                * - INTERACTIVE DATA EXTRACTION
                * - Extracting data by mouse movement
                * - Crosses setting
            */
            var datElm = document.createElement("div"), vLine = document.createElement("div"), hLine = document.createElement("div"), scrollF = 0;
            datElm.style = 'position: absolute; display: none; margin: 1px; padding: 4px; width: 100px; border: none; background: #f0e6e6; color: #af3e0a; font-size: 12px; word-wrap: break-word;';
            vLine.style = 'position: absolute; display: none; margin: 0px; padding: 0px; border: none; border-left: 1px solid #f84063; height: '+barArea.height+'px';
            hLine.style = 'position: absolute; display: none; margin: 0px; padding: 0px; border: none; border-top: 1px solid #f84063; width: '+barArea.width+'px';
            document.documentElement.appendChild(vLine); document.documentElement.appendChild(hLine); document.documentElement.appendChild(datElm);
            var barPos = {
                top: parseFloat(0), right: parseFloat(0), bottom: parseFloat(0), left: parseFloat(0)
            };
            var mousePos = {
                top: parseFloat(0), left: parseFloat(0), right: parseFloat(0)
            }
            var datTiming = 5000;
            barArea.onmousemove = (function (e) {
                if(datElm && vLine && hLine && typeof(datElm) === "object" && typeof(vLine) === "object" && typeof(hLine)){
                    /*
                        * - (Math.ceil((100 - ((100 * (e.offsetY / maxH)) - (100 * (barArea.height - maxH) / barArea.height)))) * (largestVal / 100))
                    */
                    scrollF = Math.ceil((100 - ((100 * (e.offsetY / maxH)) - (100 * (barArea.height - maxH) / barArea.height))));
                    if(scrollF > 100 || scrollF < 0){
                        hLine.style.display = "none"; vLine.style.display = "none"; datElm.style.display = "none";
                        return false;
                    }else{
                        barPos.top = (barArea.getBoundingClientRect().top + window.scrollY);
                        barPos.left = (barArea.getBoundingClientRect().left + window.scrollX);
                        mousePos.top = (parseFloat(e.clientY) + parseFloat(window.scrollY));
                        mousePos.left = (parseFloat(e.clientX) + parseFloat(window.scrollX));
                        mousePos.right = (parseFloat(window.innerWidth) - mousePos.left);
                        if(mousePos.left > mousePos.right){
                            datElm.style.right = mousePos.right+"px";
                        }else{
                            datElm.style.left = mousePos.left+"px";
                        }
                        datElm.innerHTML = "Data: "+(scrollF * (largestVal / 100));
                        datElm.style.top = mousePos.top+"px"; 
                        hLine.style.top = mousePos.top+"px"; hLine.style.left = barPos.left+"px";
                        vLine.style.left = e.clientX+"px"; vLine.style.top = barPos.top+"px";
                        if(datElm.style.display === "none"){
                            datElm.style.display = "block";
                            setTimeout(function (){
                                hideElm(datElm);
                            }, datTiming);
                        }
                        if(hLine.style.display === "none"){
                            hLine.style.display = "block";
                            setTimeout(function (){
                                hideElm(hLine);
                            }, datTiming);
                        }
                        if(vLine.style.display === "none"){
                            vLine.style.display = "block";
                            setTimeout(function (){
                                hideElm(vLine);
                            }, datTiming);
                        }
                    }
                }else{
                    return false;
                }
            });

            return barArea;
        }
    }
}


/*
    * - Arcs and cyclic patterns
    * - Common functions
    * - Special functions
*/
function strikeArcPortion(warea, mid, r, theta1, theta2, arcW, shade){
    if(!warea || !(typeof(warea) === "object") || !(typeof(mid) === "object") || !r || theta1 === "undefined" || theta2 === "undefined"){
        return false;//THROW ERROR
    }else{
        if(!mid.hasOwnProperty("x") || !mid.hasOwnProperty("y")){
            return false;
        }
        r = parseFloat(r);
        /*
            * - A plot of theta values against ∆X takes the form of a cosine wave.
            * - [∆X / r] = cos(theta)
            * - ∆X = r cos(theta)
            * - A plot of theta values against ∆Y takes the form of a sine wave.
            * - [∆Y / r] = sin(theta)
            * - ∆Y = r sin(theta)
        */
        const maxX = (parseFloat(mid.x) + r);
        var outLine = warea.getContext("2d");
        outLine.globalCompositeOperation = "source-over";
        outLine.beginPath();
        outLine.strokeStyle = shade; outLine.lineWidth = parseInt(arcW);
        outLine.arc(parseFloat(mid.x), parseFloat(mid.y), parseFloat(r), parseFloat(theta1), parseFloat(theta2), false);
        outLine.stroke();
        outLine.closePath();
        outLine.beginPath();
        outLine.strokeStyle = "#a2b20b"; outLine.lineWidth = 1;
        outLine.moveTo(mat.cycx(parseFloat(180 * theta1 / Math.PI), r, mid.x), mat.cycy(parseFloat(180 * theta1 / Math.PI), r, mid.y));
        outLine.lineTo(mid.x, mid.y);
        outLine.moveTo(mat.cycx(parseFloat(180 * theta2 / Math.PI), r, mid.x), mat.cycy(parseFloat(180 * theta2 / Math.PI), r, mid.y));
        outLine.lineTo(mid.x, mid.y);
        outLine.stroke();
        outLine.closePath();
    }
}

function drawPieChart(r, vardata = {"variable": {"data": 0, "shade": "blue"}}) {
    if(!r || !(parseInt(r) > 0) || !(typeof(vardata) === "object")){
        return false;//THROW ERROR
    }else{
        const pattSymb = /%/;
        if(pattSymb.test(r)){
            r = parseInt(((parseInt(r) / 100) * parseFloat(window.innerHeight)));
        }else{
            r = parseInt(r);
        }
        const pie = document.createElement("canvas");
        pie.width = pie.height = (2 * r * 1.02); pie.height += 200;
        const mainBackground = pie.getContext("2d");
        mainBackground.globalCompositeOperation = "destination-over";
        mainBackground.fillStyle = "#f8fff8";
        mainBackground.fillRect(0, 0, pie.width, pie.height);
        mainBackground.restore();

        const mid = {x: (pie.width / 2), y: ((pie.height / 2) - 100)};

        function getObjTotal(args){
            if(args && typeof(args) === "object"){
                var sumVal = 0;
                try{
                    for(datatray in args){
                        if(args[datatray].hasOwnProperty("data")){
                            sumVal = sumVal + parseFloat(args[datatray].data);
                        }else{
                            continue;
                        }
                    }
                    return sumVal;
                }catch(err){
                    console.log(err.message);//ERROR MESSAGE
                }
            }else{
                return false;
            }
        }

        for(datatray in vardata){
            if(!vardata[datatray].hasOwnProperty("data") || !vardata[datatray].hasOwnProperty("shade")){
               delete vardata[datatray];
            }else{
                continue;
            }
        }

        var startAng = 0, datTtl = parseFloat(getObjTotal(vardata));
        if(datTtl == 0){
            return false;
        }
        
        var legendX = 10, legendY = (2 * r) + 20, lblLen = 45;
        var legendPen = pie.getContext("2d"); legendPen.globalCompositeOperation = "source-over";
        legendPen.fillStyle = "black"; legendPen.font = "14px ui-sans-serif";
        legendPen.fillText("Legend: ", legendX, legendY); legendPen.strokeStyle = "#a2b20b";
        legendPen.moveTo(legendX, legendY); legendPen.lineTo(pie.width, legendY);
        legendPen.stroke();
        for(tray in vardata){
            var piQuota = ((f(vardata[tray].data) * 360 / datTtl) * Math.PI / 180);
            strikeArcPortion(pie, mid, r, startAng, (startAng + piQuota), 8, vardata[tray].shade);
            legendPen.strokeStyle = vardata[tray].shade; legendPen.lineWidth = 8;
            legendPen.beginPath();
            legendPen.moveTo(legendX, (legendY+10));
            legendPen.lineTo(lblLen, (legendY+10));
            legendPen.stroke();
            legendPen.fillText(tray + " -> " + ((f(vardata[tray].data) * 100 / datTtl).toFixed(2)) + " %", (legendX + lblLen + 3), legendY + 14);
            legendPen.closePath();
            legendY = (legendY + 20);
            startAng = startAng + piQuota;
        }
        return pie;
    }
}


function lineGraph(vardata = {description: "description info", width: 0, height: 0, dataArray: []}){
    if(!vardata || !(typeof(vardata) === "object" || vardata.dataArray.length == 0)){
        return false;//THROW AN ERROR
    }else{
        const graphLid = document.createElement("canvas");
        const prpatt = /%/;
        if(!vardata.hasOwnProperty("width") || !vardata.hasOwnProperty("height") || !vardata.hasOwnProperty("dataArray") || !vardata.hasOwnProperty("description")){
            return false;
        }else{
            if(prpatt.test(vardata.width)){
                graphLid.width = (window.innerWidth * f(vardata.width.replace("%", vardata.width)) / 100);
            }else{
                graphLid.width = (f(vardata.width));
            }
            if(prpatt.test(vardata.height)){
                graphLid.height = (window.innerHeight * f(vardata.height.replace("%", vardata.height)) / 100);
            }else{
                graphLid.height = (f(vardata.height));
            }
        }
        const areaShade = graphLid.getContext("2d"); areaShade.globalCompositeOperation = "destination-over";
        areaShade.fillStyle = "black"; areaShade.fillRect(0, 0, graphLid.width, graphLid.height); areaShade.restore();

        vardata.dataArray = mat.floatobj(vardata.dataArray);
        var infoCtx = graphLid.getContext("2d"); infoCtx.globalCompositeOperation = "source-over"; infoCtx.fillStyle = "green";
        infoCtx.font = "10px ui-sans-serif";
        infoCtx.fillText(Date(), 10, 20);
        infoCtx.font = "12px ui-sans-serif"; infoCtx.fillStyle = "blue";
        infoCtx.fillText("data: "+vardata.description, 10, 35);
        infoCtx.restore();

        function scaleMark(warea, tapeW = 25, maxH) {
            if(!warea){
                return false; //THROW ERROR
            }else{
                tapeW = parseFloat(tapeW); maxH = parseFloat(maxH);
                var vStep = parseFloat((maxH / 100)), freq = 0;
                var smrk = warea.getContext("2d");
                smrk.globalCompositeOperation = "source-over";
                smrk.fillStyle = "blue";
                smrk.font = "14px Arial";
                /*
                    * - Y-pos evaluation -> (warea.height - ((pr / 100) * maxH))
                */
                smrk.lineWidth = "1"; smrk.strokeStyle = "#454845";
                smrk.moveTo(0, warea.height); smrk.lineTo(tapeW, warea.height); smrk.stroke();
                for(var pr = 0; pr <= 100; pr++){
                    if(freq === 5){
                        freq++;
                        smrk.moveTo(0, (warea.height - ((pr / 100) * maxH))); 
                        smrk.lineTo((tapeW * 0.75), (warea.height - ((pr / 100) * maxH))); 
                        smrk.stroke();
                        continue;
                    }
                    smrk.moveTo(0, (warea.height - ((pr / 100) * maxH))); 
                    smrk.lineTo((tapeW / 2), (warea.height - ((pr / 100) * maxH))); 
                    smrk.stroke();
                    if(freq === 10){
                        if(pr !== 100){
                            smrk.fillStyle = "blue";
                            smrk.font = "13px Arial";
                            smrk.fillText(pr+"%\t", (tapeW * 0.5), (warea.height - ((pr / 100) * maxH)));
                        }
                        smrk.moveTo(0, (warea.height - ((pr / 100) * maxH))); 
                        smrk.lineTo(tapeW, (warea.height - ((pr / 100) * maxH))); 
                        smrk.stroke();
                        freq = 0;
                    }
                    if(pr === 100){
                        smrk.restore();
                        smrk.globalCompositeOperation = "source-over";
                        smrk.lineWidth = "1"; smrk.strokeStyle = "#888f0f";
                        smrk.moveTo(0, (warea.height - maxH));
                        smrk.lineTo(warea.width, (warea.height - maxH));
                        smrk.stroke();
                    }
                    freq++;
                }
            }
        }

        var H = f(graphLid.height) - 45 - 10; /* PADDING OF 10 */ 
        scaleMark(graphLid, 20, H); /* APPEND % SCALE */
        var spacing = ((f(graphLid.width) - 30 - 10) / vardata.dataArray.length); /* PADDING OF 10 AND 30 FOR SCALE */
        var penDrop = 0, biggestVal = largest(vardata.dataArray), penStrike = graphLid.getContext("2d");
        var ordsCache = {x: 30, y: (f(graphLid.height) - (vardata.dataArray[parseInt(Object.keys(vardata.dataArray)[0])] * H / biggestVal))};
        if(biggestVal == 0){
            return false;//THROW ERROR
        }
        penStrike.globalCompositeOperation = "source-over"; penStrike.lineWidth = 1;
        penStrike.strokeStyle = "white";
        /*
            * - h = graphLid.height - [value * H / biggestVal]
        */
        for(q in vardata.dataArray){
            if(q === Object.keys(vardata.dataArray)[0]){
                continue;
            }
            penStrike.beginPath();
            penStrike.moveTo(f(ordsCache.x), f(ordsCache.y));
            penStrike.lineTo(f(ordsCache.x) + spacing, (f(graphLid.height) - (vardata.dataArray[q] * H / biggestVal)));
            penStrike.stroke();
            penStrike.closePath();
            ordsCache.x = (f(ordsCache.x) + spacing); ordsCache.y = (f(graphLid.height) - (vardata.dataArray[q] * H / biggestVal));
        }
        penStrike.restore();

        /*
            * - Strike a line at mean
        */
        if(!(mat.mean(vardata.dataArray) === false)){
            var meanVardata = parseFloat(mat.mean(vardata.dataArray));
            var mstrk = graphLid.getContext("2d");
            mstrk.globalCompositeOperation = "source-over";
            mstrk.lineWidth = "0.5"; mstrk.strokeStyle = "green"; mstrk.setLineDash([3, 2]);
            /*
                * - Mean height (graphLid.height - ((meanVardata * H) / biggestVal))
            */
            mstrk.moveTo(0, (graphLid.height - ((meanVardata * H) / biggestVal)));
            mstrk.lineTo(graphLid.width, (graphLid.height - ((meanVardata * H) / biggestVal)));
            mstrk.stroke();
            mstrk.fillStyle = "green";
            mstrk.font = "10px ui-sans-serif";
            mstrk.fillText("mean: "+meanVardata, (graphLid.width / 2), (graphLid.height - ((meanVardata * H) / biggestVal)));
        }else{
            return false; //THROW ERROR
        }
        
        /*
            * - INTERACTIVE DATA EXTRACTION
            * - Extracting data by mouse movement
            * - Crosses setting
        */
        var datElm = document.createElement("div"), vLine = document.createElement("div"), hLine = document.createElement("div"), scrollF = 0;
        datElm.style = 'position: absolute; display: none; margin: 1px; padding: 4px; width: 100px; border: none; background: #f0e6e6; color: #1211cf; font-size: 12px; word-wrap: break-word;';
        vLine.style = 'position: absolute; display: none; margin: 0px; padding: 0px; border: none; border-left: 1px solid #b81030; height: '+graphLid.height+'px';
        hLine.style = 'position: absolute; display: none; margin: 0px; padding: 0px; border: none; border-top: 1px solid #b81030; width: '+graphLid.width+'px';
        document.documentElement.appendChild(vLine); document.documentElement.appendChild(hLine); document.documentElement.appendChild(datElm);
        var barPos = {
            top: parseFloat(0), right: parseFloat(0), bottom: parseFloat(0), left: parseFloat(0)
        };
        var mousePos = {
            top: parseFloat(0), left: parseFloat(0), right: parseFloat(0)
        }
        var datTiming = 5000;
        graphLid.onmousemove = (function (e) {
            if(datElm && vLine && hLine && typeof(datElm) === "object" && typeof(vLine) === "object" && typeof(hLine)){
                /*
                    * - (Math.ceil((100 - ((100 * (e.offsetY / H)) - (100 * (graphLid.height - H) / graphLid.height)))) * (biggestVal / 100))
                */
                scrollF = Math.ceil((100 - ((100 * (e.offsetY / H)) - (100 * (graphLid.height - H) / graphLid.height))));
                if(scrollF > 100 || scrollF < 0){
                    hLine.style.display = "none"; vLine.style.display = "none"; datElm.style.display = "none";
                    return false;
                }else{
                    barPos.top = (graphLid.getBoundingClientRect().top + window.scrollY);
                    barPos.left = (graphLid.getBoundingClientRect().left + window.scrollX);
                    mousePos.top = (parseFloat(e.clientY) + parseFloat(window.scrollY));
                    mousePos.left = (parseFloat(e.clientX) + parseFloat(window.scrollX));
                    mousePos.right = (parseFloat(window.innerWidth) - mousePos.left);
                    if(mousePos.left > mousePos.right){
                        datElm.style.right = mousePos.right+"px";
                    }else{
                        datElm.style.left = mousePos.left+"px";
                    }
                    datElm.innerHTML = "Data: "+(scrollF * (biggestVal / 100));
                    datElm.style.top = mousePos.top+"px"; 
                    hLine.style.top = mousePos.top+"px"; hLine.style.left = barPos.left+"px";
                    vLine.style.left = e.clientX+"px"; vLine.style.top = barPos.top+"px";
                    if(datElm.style.display === "none"){
                        datElm.style.display = "block";
                        setTimeout(function (){
                            hideElm(datElm);
                        }, datTiming);
                    }
                    if(hLine.style.display === "none"){
                        hLine.style.display = "block";
                        setTimeout(function (){
                            hideElm(hLine);
                        }, datTiming);
                    }
                    if(vLine.style.display === "none"){
                        vLine.style.display = "block";
                        setTimeout(function (){
                            hideElm(vLine);
                        }, datTiming);
                    }
                }
            }else{
                return false;
            }
        });

        return graphLid;
    }
}