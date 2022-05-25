const fetchData = async ( api ) => {
	try {
		const res = await fetch( api )
		const json = await res.json()
		if(json.error){
      throw(json)
    }
		return (json.photos.photo)
	} 
	catch( err ) {
		console.log(err)
	}
}

export { fetchData }