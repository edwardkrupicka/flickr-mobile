const fetchData = async ( api, setState, setLoaded ) => {
	try {
		const res = await fetch( api )
		const json = await res.json()
		if(json.error){
      throw(json)
    }
		setState(json.photos.photo)
		setLoaded(true)
	} 
	catch( err ) {
		console.log(err)
	}
}

export { fetchData }