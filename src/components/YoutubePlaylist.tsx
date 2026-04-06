import { useEffect, useState } from "react";

const PLAYLIST_ID = "PLJDWpFL5ny_ooRDdzxZp13tFuJPb35Ih7";

export default function YoutubePlaylist() {

const [videos, setVideos] = useState<any[]>([]);
const [principal, setPrincipal] = useState("");

useEffect(() => {

async function carregar() {

const res = await fetch(
`https://www.youtube.com/feeds/videos.xml?playlist_id=${PLAYLIST_ID}`
);

const xml = await res.text();

const parser = new DOMParser();
const data = parser.parseFromString(xml, "text/xml");

const entries = Array.from(data.querySelectorAll("entry"));

const lista = entries.map((entry:any)=>({

id: entry.querySelector("yt\\:videoId").textContent,
title: entry.querySelector("title").textContent,
published: entry.querySelector("published").textContent

}));

lista.sort(
(a,b)=> new Date(b.published).getTime() - new Date(a.published).getTime()
);

setPrincipal(lista[0].id);
setVideos(lista);

}

carregar();

},[]);

return(

<div className="flex flex-col lg:flex-row gap-6">

<div className="flex-1">

<iframe
className="w-full h-[420px] rounded-lg"
src={`https://www.youtube.com/embed/${principal}`}
allowFullScreen
/>

</div>

<div className="w-full lg:w-[350px] overflow-y-auto max-h-[420px]">

{videos.map(video=>(

<div
key={video.id}
className="flex gap-3 mb-3 cursor-pointer"
onClick={()=>setPrincipal(video.id)}
>

<img
className="w-[140px] rounded"
src={`https://img.youtube.com/vi/${video.id}/mqdefault.jpg`}
/>

<p className="text-sm">{video.title}</p>

</div>

))}

</div>

</div>

);

}