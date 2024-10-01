export type personApiData ={
    results:Array<{
      name:string
      profile_path:string
      known_for_department:string
      id:number
      media_type:string
      known_for: Array<{
        id:number,
        name:string,
        title:string,
        backdrop_path:string
        poster_path: string
        overview:string
      }>
      
    }>
  }
export type knew_for={  
    id:number,
    name:string,
    overview:string
    poster_path: string
}
export type knaw_for={  
  id:number
  name:string,
  title:string
  overview:string
  backdrop_path:string
  poster_path: string
}

export type movieApiData = {
    results:[{
    id: number
    backdrop_path: string
    media_type:string
    title:string
    overview:string
    poster_path:string
    release_date: string
    }]
  }

export type tvApiData ={
    results:[{
        id: number
        backdrop_path:string
        media_type:string
        name:string
        overview:string
        poster_path:string
        first_air_date:string
    }]
}
  