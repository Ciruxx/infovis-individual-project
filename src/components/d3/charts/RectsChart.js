import React, { Component } from 'react'
import * as d3 from 'd3'
import {rects} from "../../../data/data.json"
import './RectsChart.css';

import { withStyles } from '@material-ui/core/styles';

import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';

import HeightIcon from '@material-ui/icons/Height';
import PaletteIcon from '@material-ui/icons/Palette';
import BorderHorizontalIcon from '@material-ui/icons/BorderHorizontal';
import BorderVerticalIcon from '@material-ui/icons/BorderVertical';

import * as colors from '@material-ui/core/colors';

const useStyles = (theme) => ({
    root: {
        width: '100%',
        maxWidth: 800,
        backgroundColor: theme.palette.background.paper,
    },
});

class RectsChart extends Component {
    constructor(props) {
        super(props);

        this.canvasRef = React.createRef();
        this.svg = null
        this.handleClick = this.handleClick.bind(this)
        this.update = this.update.bind(this)
    }
    componentDidMount() {
        this.draw()
    }

    draw() {
        const svg = d3.select(this.canvasRef.current)
            .append("div")
            // Container class to make it responsive.
            .classed("svg-container", true)
            .append("svg")
            // Responsive SVG needs these 2 attributes and no width and height attr.
            .attr("preserveAspectRatio", "xMinYMin meet")
            .attr("viewBox", "0 0 800 800")
            // Class to make it responsive.
            .classed("svg-content-responsive", true)

        svg.append("g").selectAll("rect")
            .data(rects)
            .enter()
            .append("rect")
            .attr("x", function (d) {
                return d.x;
            })
            .attr("y", function (d) {
                return d.y;
            })
            .attr("width", function (d) {
                return d.width;
            })
            .attr("height", function (d) {
                return d.height;
            })
            .attr("fill", function (d) {
                return d.color;
            })
        this.svg = svg
    }

    handleClick(event, characteristic){
        event.preventDefault()
        if (event.type === 'click') {
            console.log('Left click');
            this.update("y", characteristic)
        } else if (event.type === 'contextmenu') {
            console.log('Right click');
            this.update("x", characteristic)
            return false
        }
    }
    update(baseCharacteristic, changeCharacteristic){
        console.log(`UPDATE: ${baseCharacteristic} <--> ${changeCharacteristic}`)

        let updatedRects = [...rects]
        updatedRects = updatedRects.map((rect) => {
            if(changeCharacteristic === "color") {
                rect.color = this.getRandomColor()
                return rect
            }
            const baseCharacteristicValue = rect[baseCharacteristic]
            const changeCharacteristicValue = rect[changeCharacteristic]
            console.log(`VALUES: ${baseCharacteristicValue} <--> ${changeCharacteristicValue}`)
            console.log(rect)
            rect[baseCharacteristic] = changeCharacteristicValue
            rect[changeCharacteristic] = baseCharacteristicValue
            return rect
        })

        console.log("UPDATE RESULT:")
        console.log(updatedRects)
        //rejoin data
        const rect = this.svg.select("g").selectAll("rect").data(updatedRects);
        rect.exit().remove(); //remove unneeded rects
        rect.enter().append("rect")
            .attr("width", 0)
            .attr("height", 0)
            .merge(rect)
            .attr("x", function(d) {
                return d.x;
            })
            .attr("y", function(d) {
                return d.y;
            })
            .attr("width", function(d) {
                return 0;
            })
            .attr("height", function(d) {
                return 0;
            })
            .attr("fill", function(d) {
                return "#000000";
            })
        rect.transition()
            .attr("width", function(d) {
                return d.width;
            })
            .attr("height", function(d) {
                return d.height;
            })
            .attr("fill", function(d) {
                return d.color;
            })
            .duration((d,i) => {return 200*(i+1)})
            .delay((d,i) => {return 200*i})
    }
    getRandomColor(){
        return '#'+(Math.random()*0xFFFFFF<<0).toString(16);
    }

    render() {
        const {classes} = this.props
        return(
        <div className={classes.root}>
            <List component="nav" aria-label="main mailbox folders">
                <ListItem button onClick={(event) => this.handleClick(event, "x")} onContextMenu={(event) => this.handleClick(event, "x")}>
                    <ListItemIcon >
                        <BorderHorizontalIcon style={{ color: colors.red[500] }} />
                    </ListItemIcon>
                    <ListItemText primary="Coordinate X" />
                </ListItem>
                <ListItem button onClick={(event) => this.handleClick(event, "y")} onContextMenu={(event) => this.handleClick(event, "y")}>
                    <ListItemIcon>
                        <BorderVerticalIcon style={{ color: colors.yellow[600] }} />
                    </ListItemIcon>
                    <ListItemText primary="Coordinate Y" />
                </ListItem>
                <ListItem button onClick={(event) => this.handleClick(event, "height")} onContextMenu={(event) => this.handleClick(event, "height")}>
                    <ListItemIcon>
                        <HeightIcon style={{ color: colors.green[500] }}/>
                    </ListItemIcon>
                    <ListItemText primary="Height" />
                </ListItem>
                <ListItem button onClick={(event) => this.handleClick(event, "width")} onContextMenu={(event) => this.handleClick(event, "width")}>
                    <ListItemIcon>
                        <HeightIcon color="primary" style={{transform: "rotate(90deg)",  color: colors.blue[500]}}/>
                    </ListItemIcon>
                    <ListItemText primary="Width" />
                </ListItem>
                <ListItem button onClick={(event) => this.handleClick(event, "color")} onContextMenu={(event) => this.handleClick(event, "color")}>
                    <ListItemIcon>
                        <PaletteIcon style={{ color: colors.brown[500] }}/>
                    </ListItemIcon>
                    <ListItemText primary="Color" />
                </ListItem>
            </List>
            <div ref={this.canvasRef} />
        </div>
    )}
}
export default withStyles(useStyles, { withTheme: true })(RectsChart);