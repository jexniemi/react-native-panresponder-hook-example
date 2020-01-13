import React, { useEffect, useState, useMemo } from 'react'
import { Animated, Text, View, PanResponder } from 'react-native'
 
export default (props) => {
	const [pan] = useState(new Animated.ValueXY())

	const panResponder = useMemo(() => PanResponder.create({
		onMoveShouldSetResponderCapture: () => true, // Allow movement of the view
    onMoveShouldSetPanResponderCapture: () => true, // Allow dragging

    onPanResponderGrant: (e, gestureState) => {
			// Prevent from moving back to initial value
			pan.setOffset({x: pan.x._value, y: pan.y._value});
			// Set initial value
			pan.setValue({ x: 0, y: 0 })
    },

    onPanResponderMove: Animated.event([
			null, { dx: pan.x, dy: pan.y }
    ]),

    onPanResponderRelease: (e, {vx, vy}) => {
			// Flatten the offset to avoid erratic behavior
  		pan.flattenOffset();
    }
	}))
	
	let [translateX, translateY] = [pan.x, pan.y];
	let transform = {transform: [{translateX}, {translateY}]};

	return (
	<View style={styles.container}>
		<Animated.View 
			{...panResponder.panHandlers}
			style={{ ...transform, height: 30, width: 30, backgroundColor: 'white'}}
		>
		</Animated.View>
	</View>
	)
}

const styles = {
	container: {
		flex: 1,
		backgroundColor: 'red',
	},
}
