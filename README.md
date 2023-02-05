# STATISTICAL CHARTS IN HTML 5 CANVAS
## *I'm a html 5-canvas fanatic
## <p>
    This project involves building a javascript library with functions to help you generate statistical charts without any need for css.
    It relies entirely on the html 5 canvas and provides means for extracting data from the chart by simply hovering the mouse.
</p>

## Supported charts

  * Bar Charts
  * Pie Charts
  * Lines/ Curves (can be made realtime/ moving charts)
<hr>

## <p> Include this in the head section. </p>

```html
    <script src="js/charts.js"></script>
```
## <p> Make a Bar Chart. </p>

```js
        const parent = document.documentElement;
        // pass the following: width, height, dataObect
        const barChart = drawBarChart('100 %', '90 %', {"A": 1, "B": 2, "C": 3, "D": 4, "E": 5});
        parent.appendChild(barChart);
```

## <p> Make a Pie Chart. </p>

```js
        // pass the following: radius, dataObject
        /*
            Here's how the dataObject looks like;
            {
                "item1": {"data": "value", "shade": "color"}, 
                "item2": {"data": "value", "shade": "color"}
            }
            * value is a number
            * color could be a name or a hex value for a given color
        */
        const data = {
            "phy": {"data": 50, "shade": "purple"}, 
            "comp": {"data": 30, "shade": "blue"}, 
            "geo": {"data": 65, "shade": "green"}, 
            "maths": {"data": 120, "shade": "red"}
        };
        const pieChart = drawPieChart("40 %", data);
        const parent = document.documentElement;
        parent.appendChild(pieChart);
```
## <p> Make a Line Graph. </p>

```js
        const data = ['65188', '22370', '51918', '67921', '13864', '62551', '33488', '93387', '44756', '63935'];
        const myLneGraph = lineGraph({description: "1hr chart", width: "90 %", height: "90 %", dataArray: data});
        const parent = document.documentElement;
        parent.appendChild(myLineGraph);
```


## Contributing

This project welcomes all constructive contributions. Contributions take many forms,
from code for bug fixes and enhancements, to additions and fixes to documentation, additional
tests, triaging incoming pull requests and issues, and more!

## People

Author and maintainer [benkimz](https://github.com/benkimz)

## License

  [MIT](LICENSE)