import { useState, useEffect } from 'react';
import { View, Text, ActivityIndicator } from 'react-native';
import { Image } from 'react-native-elements';

const ImageCard = ({ element }) => {

	return (
		<View >
			<Image 
				style={{width: 150, height: 150, margin: 5 }} 
				source={{ url: `http://farm${element.farm}.static.flickr.com/${element.server}/${element.id}_${element.secret}.jpg` }}
				PlaceholderContent={<ActivityIndicator />}
				/>
		</View>
	)
}

export default ImageCard;
