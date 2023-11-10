import Geolocation from "@react-native-community/geolocation";
import { useEffect, useRef, useState } from "react";

interface Location {
    latitude: number;
    longitude: number;
}

export const useLocation = () => {


    const [hasLocation, setHasLocation] = useState(false)
    const [routeLine, setRouteLine] = useState<Location[]>([])
    const watchId = useRef<number>()

    const [initialPosition, setInitialPosition] = useState<Location>({
        latitude: 0,
        longitude: 0,
    })

    
    const [userLocation, setUserLocation] = useState<Location>({
        latitude: 0,
        longitude: 0,
    })

    
    const isMounted = useRef<boolean>(true)

    useEffect(() => {
        isMounted.current = true
    
      return () => {
        isMounted.current = false
      }
    }, [])
    

    useEffect(() => {
      
        if (!isMounted) { return }

        Geolocation.getCurrentPosition(
            info => {
                setInitialPosition({
                    latitude: info.coords.latitude,
                    longitude: info.coords.longitude,
                })
                setUserLocation({
                    latitude: info.coords.latitude,
                    longitude: info.coords.longitude,
                })
                setRouteLine( routes => [...routes,{
                    latitude: info.coords.latitude,
                    longitude: info.coords.longitude,
                }])
                setHasLocation(true)
            }
            ,(err)=>console.log(err)
            ,{
                enableHighAccuracy: true,
                timeout: 20000,
                distanceFilter: 100 ,
                maximumAge: 1000,
            });
    }, [])


    const getCurrentLocation = ():Promise<Location> => {

        

        return new Promise((resolve, reject) => {

            
            if (!isMounted)  return

            Geolocation.getCurrentPosition(
                info => {


                    resolve({
                        latitude: info.coords.latitude,
                        longitude: info.coords.longitude,
                    })
                }
                ,(err)=>reject(err)
                ,{
                    enableHighAccuracy: true,
                });
        })
    }


    const followUserLocation = ()=>{

        if (!isMounted)  return
        
       watchId.current =  Geolocation.watchPosition(
            info => {

                setUserLocation({
                    latitude: info.coords.latitude,
                    longitude: info.coords.longitude,
                })
                
                setRouteLine( routes => [...routes,{
                    latitude: info.coords.latitude,
                    longitude: info.coords.longitude,
                }])
            }
            ,(err)=>console.log(err)
            ,{
                enableHighAccuracy: true,
                distanceFilter: 10 ,
            });

    }

    const stopFollowUser = () => {
        if (watchId.current) {
            Geolocation.clearWatch(watchId.current)
        }
    }

    return {
        hasLocation,
        initialPosition,
        getCurrentLocation,
        followUserLocation,
        userLocation,
        stopFollowUser,
        routeLine
    }
}