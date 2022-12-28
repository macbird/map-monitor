import React, {useCallback, useEffect, useState} from 'react';
import {GoogleMap, InfoWindowF, MarkerF, PolylineF, useJsApiLoader} from "@react-google-maps/api";
import "./css/MapPage.css"
import {FaHospitalAlt, FaMapMarkerAlt, FaPhoneAlt} from 'react-icons/fa';
import {
    faFlag,
    faFlagCheckered,
    faHeartPulse,
    faLocationPin,
    faPersonPregnant,
    faUserNurse,
    faWheelchair
} from "@fortawesome/free-solid-svg-icons";
import {useApp} from "../context/AppProvider/useApp"
import {GoCalendar} from "react-icons/go";
import {getAtividadeByAgente, getInitialMarkers} from "../service/api"

type position = {
    lat: number,
    lng: number
}
type info = {
    nome: string,
    esf: string,
    telefone: string,
    zoneamento: string,
    base64: string
}
type marker = {
    id: string;
    icon: string;
    info?: info
    position: position,
    color: string,
    anchor?: number[]
}
const options = {
    strokeColor: '#FF0000',
    strokeOpacity: 0.2,
    strokeWeight: 2,
    fillColor: '#FF0000',
    fillOpacity: 0.35,
    clickable: false,
    draggable: false,
    editable: false,
    visible: true,
    radius: 30000,
    zIndex: 1
};
const optionsRoute = {
    strokeColor: '#FF0000',
    strokeOpacity: 0.8,
    strokeWeight: 5,
    fillColor: '#FF0000',
    fillOpacity: 0.35,
    clickable: false,
    draggable: false,
    editable: false,
    visible: true,
    radius: 30000,
    zIndex: 1
};
const myStyles = [
    {
        featureType: "poi",
        elementType: "labels",
        stylers: [{visibility: "off"}]
    }
];
const mapOptions = {
    streetViewControl: false,
    mapTypeControl: false,
    styles: myStyles
};


const icon = (key = 'faWheelchair') => {

    switch (key) {
        case 'faPersonPregnant':
            return faPersonPregnant.icon;


        case 'faWheelchair':
            return faWheelchair.icon;
        case 'faHeartPulse':
            return faHeartPulse.icon;
        case 'faUserNurse':
            return faUserNurse.icon;
        case 'faFlag':
            return faFlag.icon;
        case 'faFlagCheckered':
            return faFlagCheckered.icon;
        default:
            return faLocationPin.icon
    }


}

// @ts-ignore
const InfoAgent = ({info}) => {
    console.log("info", info)
    return (

        <>
            <div className="flex mx-auto sm:mr-10 sm:m-0">
                <div
                    className="items-center justify-center w-20 h-20 m-auto mr-4 sm:w-24 sm:h-24">
                    <img alt="profile"
                         src={info.base64}
                         className="object-cover w-20 h-20 mx-auto rounded-full sm:w-24 sm:h-24"/>
                </div>
            </div>
            <div className="flex flex-col items-start w-full m-auto sm:flex-row">
                <div className="pb-6 px-6 flex flex-row mt-4">
                    <GoCalendar size={30} className="mr-4"/>
                    21/11/2022 8:00
                </div>
                <div className="pb-6 px-6 flex flex-row mt-4">
                    <GoCalendar size={30} className="mr-4"/>
                    21/11/2022 13:00
                </div>
            </div>
        </>
    );
}

const MapPage = () => {
    const {openPanelFloat, openLoading, closeLoading} = useApp();
    const {isLoaded} = useJsApiLoader({
        id: 'google-map-script',
        // googleMapsApiKey: 'AIzaSyDICQpEjprKEL6SW8Wn8Yemaq4P4c4tw6c'
        googleMapsApiKey: 'AIzaSyCmQafwVpbmxLFlwhOnC-XyUiyADx_1Ie8'
    })
    const defaultMapOptions = {
        fullscreenControl: false,
        mapTypeControl: false,
        streetViewControl: false
    };
    const [activeMarker, setActiveMarker] = useState(null);
    const [polyline, setPolyline] = useState<any[] | null>([]);
    const [route, setRoute] = useState([]);
    const handleActiveMarker = (marker: any) => {
        if (marker === activeMarker) {
            return;
        }
        setActiveMarker(marker);
    };


    const [markers, setMarker] = useState<any[]>([])

    const loadMarkers = async () => {
        openLoading()
        const data = await getInitialMarkers();
        closeLoading()
        return data
    }
    useEffect(() => {
        const getMarker = async () => {
            var data = await loadMarkers()
            console.log("DATA", data)
            setMarker(data)
        }
        getMarker();

    }, [])

    function sleep(ms: number) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    const getAtividade = async (id: string, info: any) => {
        console.log("id", id)
        openLoading()
        const atividade = await getAtividadeByAgente(id)
        closeLoading()
        console.log("Atividade", atividade)
        let startMarker: marker = {
            id: atividade[0].lat.toString() + atividade[0].lng.toString(),
            icon: "faFlag",
            position: {lat: atividade[0].lat, lng: atividade[0].lng},
            color: "#000000",
            anchor: [30, 450]
        }
        let last = atividade.length - 1;
        let stopMarker: marker = {
            id: atividade[last].lat.toString() + atividade[last].lng.toString(),
            icon: "faFlagCheckered",
            position: {lat: atividade[last].lat, lng: atividade[last].lng},
            color: "#000000",
            anchor: [30, 450]
        }

        setMarker([startMarker, stopMarker])

        setPolyline(atividade.map((atividade: any) => {
            return {
                lat: atividade.lat,
                lng: atividade.lng
            }
        }));
        openPanelFloat({
            visible: true,
            component: <InfoAgent info={info}/>,
            title: "Atividade",
            onClose: async () => {
                const data = await loadMarkers();
                setMarker(data)
                setPolyline([])
                setRoute([])
                setActiveMarker(null)
            }
        })

        var ps = []
        for (const a of atividade) {
            console.log("Fire")
            // @ts-ignore
            setRoute(old => [...old, {
                lat: a.lat, lng: a.lng
            }]);
            await sleep(50);
        }
        console.log("route", route);


    }

    const [map, setMap] = useState<any>(null);
    const onLoad = useCallback((map: any) => setMap(map), []);

    useEffect(() => {
        if (map) {

            const bounds = new google.maps.LatLngBounds();
            if (polyline && polyline.length > 0) {
                polyline.forEach((polyline) => bounds.extend(polyline))
            } else {
                markers.forEach(({position}) => bounds.extend(position));
            }
            map.fitBounds(bounds);
        }
    }, [map, markers, polyline]);


    return (

        <div className="map">
            {!isLoaded ? (<></>) : (
                <GoogleMap
                    mapContainerStyle={{width: '100%', height: '100%'}}
                    onLoad={onLoad}
                    onClick={() => setActiveMarker(null)}
                    options={mapOptions}
                    zoom={16}>


                    {polyline ? (
                        <PolylineF
                            path={polyline}
                            key="poly"
                            options={options}
                        />
                    ) : null}

                    {route ? (
                        <PolylineF
                            path={route}
                            key="route"
                            options={optionsRoute}
                        />
                    ) : null}


                    {markers.map(({position, ...data}) => {


                        return (<MarkerF key={data.id}
                            //animation={window.google.maps.Animation.DROP}
                                         icon={
                                             data.info && data.info.base64 ? {
                                                 size: new google.maps.Size(40, 40),
                                                 scaledSize: new google.maps.Size(40, 40),
                                                 origin: new google.maps.Point(0, 0),
                                                 url: data.info?.base64,
                                                 anchor: new google.maps.Point(20, 20),

                                             } : {
                                                 path: icon(data.icon)[4] as string,
                                                 fillColor: data.color,
                                                 fillOpacity: 1,
                                                 anchor: new google.maps.Point(
                                                     data.anchor ? data.anchor[0] : icon(data.icon)[0] / 2, // width
                                                     data.anchor ? data.anchor[1] : icon(data.icon)[1] // height
                                                 ),
                                                 strokeWeight: 1,
                                                 strokeColor: "#ffffff",
                                                 scale: 0.05,
                                             }


                                         }
                                         onClick={() => handleActiveMarker(data.id)}
                                         position={position}
                        >
                            {activeMarker === data.id && data.info ? (
                                <InfoWindowF position={position} onCloseClick={() => setActiveMarker(null)}>
                                    <div>
                                        <div
                                            className="bg-white px-3 pt-4 mx-4 mt-0  rounded-lg shadow md:mx-auto border-1">
                                            <div className="flex flex-col items-start w-full m-auto sm:flex-row">
                                                <div className="flex mx-auto mr-10 m-0">
                                                    <div
                                                        className="items-center justify-center m-auto mr-4 sm:w-16 sm:h-16">
                                                        <img alt="profile"
                                                             src={data.info?.base64}
                                                             className="object-cover w-16 h-16 mx-auto rounded-full sm:w-20 sm:h-20"/>
                                                    </div>
                                                </div>
                                                <div>
                                                    <div>
                                                        <h2 className="font-semibold flex pr-2 text-xl  text-gray-900 sm:text-2xl">{data.info?.nome}</h2>

                                                    </div>
                                                    <div className="flex flex-row mt-4 ">
                                                        <div><FaHospitalAlt/></div>
                                                        <div className='pl-4 font-bold '>ESF {data.info?.esf}</div>
                                                    </div>
                                                    <div className="flex flex-row mt-2 ">
                                                        <div><FaPhoneAlt/></div>
                                                        <div className='pl-4 font-bold '>{data.info?.telefone}</div>
                                                    </div>
                                                    <div className="flex flex-row mt-2 ">
                                                        <div><FaMapMarkerAlt/></div>
                                                        <div
                                                            className='pl-4 font-bold '>{data.info?.zoneamento}</div>
                                                    </div>


                                                </div>
                                            </div>
                                            <div className="flex flex-col mt-2 items-end">
                                                <button onClick={() => getAtividade(data.info.device.id, data.info)}
                                                        className="bg-violet-400 text-white">Atividade
                                                </button>

                                            </div>

                                        </div>
                                    </div>

                                </InfoWindowF>
                            ) : null}
                        </MarkerF>)
                    })}


                </GoogleMap>
            )}


        </div>);
};

export default MapPage;
