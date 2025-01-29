import { useAtomValue } from 'jotai';
import { useTheme } from 'next-themes';
import { Loader } from '@googlemaps/js-api-loader';
import { useEffect, useRef, useState } from 'react';
import { atomWithReset, useResetAtom } from 'jotai/utils';
import { InputProps } from '@/components/ui/input';
import cn from '@/utils/class-names';
import { darkMode } from '@/components/google-map/map-styles';
import Spinner from '@/components/ui/spinner';
import { MarkerClusterer } from "@googlemaps/markerclusterer";
import AvatarCard from '@/components/ui/avatar-card';

export type Location = {
  address: string;
  lat: number;
  lng: number;
  name: string;
  role: string;
  phone: string;
  store:any;
  city:any;
  target:any;
  image:any;

};

interface GoogleMapsAutocompleteProps {
  apiKey: string;
  hideMap?: boolean;
  hideInput?: boolean;
  className?: string;
  mapClassName?: string;
  inputProps?: InputProps;
  spinnerClassName?: string;
  role?:string;
  local?:string;
  onPlaceSelect: (place: Location) => void;
  empLocations: Location[]
}

export const locationAtom = atomWithReset<Location>({
  address: '',
  lat: -3.745,
  lng: -38.523,
  name: '',
  role: '',
  phone: '',
  store:"",
  city:"",
  target:"",
  image:"",
});

export default function MapLocations({
  apiKey,
  className,
  hideMap = false,
  hideInput = false,
  mapClassName,
  inputProps,
  onPlaceSelect,
  spinnerClassName,
  empLocations,
  role,
  local
}: GoogleMapsAutocompleteProps) {
  // check for dark mode
  const { theme } = useTheme();
  // global location state
  const location = useAtomValue(locationAtom);
  
  const [isLoading, setIsLoading] = useState<boolean>(true);
  // to reset location
  const resetLocation = useResetAtom(locationAtom);
  const mapRef = useRef<HTMLDivElement | null>(null);
  onPlaceSelect(empLocations[0]?.store)
    const position = {
        lat: -3.759777,
        lng: -38.516305
    }

    console.log(empLocations);
    

  useEffect(() => {

    const initMap = async () => {

        const loader = new Loader({
          apiKey,
          version: 'weekly',
        });
        const { Map, InfoWindow } = await loader.importLibrary('maps')
        const { AdvancedMarkerElement, PinElement } = await loader.importLibrary('marker')
        const mapOptions: google.maps.MapOptions = {
            center: { lat: 24.792494, lng: 46.7246549 },
            zoom: 11,
            mapId: 'MY_NEXTJS_MAPID',
            ...(theme === 'dark' && {
                styles: darkMode,
              }),
        }
        const map = new Map(mapRef.current as HTMLDivElement, mapOptions)
        const infoWindow = new InfoWindow({
            content: "",
            disableAutoPan: true,
          });
        const markers = empLocations.map((position:any) => {
            const pinGlyph = new PinElement({
                glyph: position?.user.name.slice(0,2),
                glyphColor: "white",
                background: position?.status == "in_progress" ? 'red' : position?.status == 'absence' ? 'blue' :position?.status == 'coming'?"gray":position?.status == 'completed'? 'green':"gray"
              })
            const marker = new AdvancedMarkerElement({
            position: {lat: Number(position.store.lat), lng: Number(position.store.lng)},
            content: pinGlyph.element,
            });
            marker.addListener("click", () => {
              role=="Promoter"?
                infoWindow.setContent(`<div>
                

                <div>User Name: ${position?.user?.name||"Not Found"}</div>
                <div>Store Name: ${position?.store.name||"Not Found"}</div>
                <div style="padding-top: 2px;"  >Check In: ${position?.check_in_time||"Not Found"} </div>
                <div style="padding-top: 2px;"  >Check Out: ${position?.check_out_time||"Not Found"}</div>
                <div style="padding-top: 2px;"  >Target Value: ${position?.user?.promoters_target_sum_tgt_value}</div>
                <div style="padding-top: 2px;"  >Target Achived: ${position?.user?.promoters_target_sum_achived_value}</div>
                ${position?.image?` <div style="
                display: flex;
                justify-content: center;
                align-items: center;
                padding-top: 5px;
                "
                >
                <img
                style="width:30px;height:30px;border-radius: 50%;"
                src=${position?.image||""}
              />`:""}
               
                <a style="padding-top: 2px;"   class="mt-12 font-bold hover:text-red-600	" href= "https://dashboard.energizeplus.app/${local}/check_in_out_report/${role}/${position.id}"  target="blank">
                View Results
                </a>
                </div>
              
                
                </div>`)
                :
                infoWindow.setContent(`<div>
                

                <div>User Name: ${position?.user?.name||"Not Found"}</div>
                <div>Store Name: ${position?.store.name||"Not Found"}</div>
                <div style="padding-top: 2px;"  >Check In: ${position?.check_in_time||"Not Found"} </div>
                <div style="padding-top: 2px;"  >Check Out: ${position?.check_out_time||"Not Found"}</div>
                ${position?.image?` <div style="
                display: flex;
                justify-content: center;
                align-items: center;
                padding-top: 5px;
                "
                >
                <img
                style="width:30px;height:30px;border-radius: 50%;"
                src=${position?.image||""}
              />`:""}
               
                <a style="padding-top: 2px;"   class="mt-12 font-bold hover:text-red-600	" href= "https://dashboard.energizeplus.app/${local}/check_in_out_report/${role}/${position.id}"  target="blank">
                View Results
                </a>
                </div>
              
                
                </div>`)
                infoWindow.open(map, marker);
              });
            return marker;
        })
        new MarkerClusterer({ markers, map });
        setIsLoading(false);
    }

    initMap()
    
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location?.lat, location?.lng, theme, hideMap, empLocations]);


  return (
    <div className={cn(className)}>
        <div
          id="map"
          ref={mapRef}
          className={cn('h-full w-full', mapClassName)}
        />
    </div>
  );
}
