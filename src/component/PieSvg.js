import React, { useRef } from "react";
import PropTypes from 'prop-types';
import { animated, useSpring } from "react-spring";
import * as d3 from "d3";
import { animationConfig } from "common/MetaData";

const colors = ["#396FC9"];
const format = d3.format(".2f");

const Arc = ({
  index,
  from,
  to,
  createArc,
  colors,
  animatedProps,
}) => {
  const interpolator = d3.interpolate(from, to);
  return (
    <g key={index} className="arc">
      <animated.path
        className="arc"
        d={animatedProps.t.interpolate(t => createArc(interpolator(t)))}
        fill={colors[index]}
      />
    </g>
  );
};

const PieSvg = props => {
  const {
    innerRadius, outerRadius,
    data, width, height
  } = props;
  const cache = useRef([]);
  const createPie = d3
    .pie()
    .value(d => d.value)
    .sort(null);
  const createArc = d3
    .arc()
    .innerRadius(innerRadius)
    .outerRadius(outerRadius);
  const DATA = createPie(data);
  const previousData = createPie(cache.current);

  const [animatedProps, setAnimatedProps] = useSpring(() => animationConfig);
  setAnimatedProps(animationConfig);

  return (
    <svg width={width} height={height}>
      <g transform={`translate(${outerRadius} ${outerRadius})`}>
        {DATA.map((d, i) => (
          <Arc
            key={i}
            index={i}
            from={previousData[i]}
            to={d}
            createArc={createArc}
            colors={colors}
            format={format}
            animatedProps={animatedProps}
          />
        ))}
      </g>
    </svg>
  );
};

PieSvg.propTypes = {
  innerRadius: PropTypes.number,
  outerRadius: PropTypes.number,
  width: PropTypes.number,
  height: PropTypes.number,
};

export default PieSvg;
