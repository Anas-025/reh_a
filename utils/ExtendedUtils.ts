import { Chart, ChartTypeRegistry } from "chart.js/auto";
import { _DeepPartialArray } from "chart.js/dist/types/utils";
import { fbStorage } from "components/firebase/firebase-config";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";

export function returnFileSize(number: number) {
  if (number < 1024) {
    return `${number} bytes`;
  } else if (number >= 1024 && number < 1048576) {
    return `${(number / 1024).toFixed(1)} KB`;
  } else if (number >= 1048576) {
    return `${(number / 1048576).toFixed(1)} MB`;
  }
}

const fileTypes = ["image/jpeg", "image/png"];

export function validFileType(file: File): boolean{
  return fileTypes.includes(file.type);
}

export const uploadFileToFirebaseAndGetUrl = async (file: File | null, path: string) => {
  if (!file) {
    return { uploadedToUrl: "", path: "" };
  }

  const newFile = new File([file], file?.name.replace(/\s/g, "_"), {
    type: file?.type,
  });
  let type = newFile.type.split("/")[0];
  if (!type) {
    type = "other";
  }
  // create a random 8 letter alphabet string
  const name = Math.random().toString(36).substring(2, 10);
  const storagePath = path ? `${path}/${type}/${name}` : `${type}/${name}`;
  const storageRef = ref(fbStorage, storagePath);

  const uploadedToUrl = await uploadBytes(storageRef, newFile).then(
    async (snapshot) => {
      //return newFile url
      const url = await getDownloadURL(snapshot.ref).then((url) => {
        return url;
      });
      return url;
    }
  );
  return { uploadedToUrl, path };
};

export const chartMaker = (
  id: string,
  type: keyof ChartTypeRegistry,
  data: any,
  title: string | _DeepPartialArray<string>,
  label: string
) => {

  new Chart(document.getElementById(id) as HTMLCanvasElement, {
    type: type,
    data: {
      datasets: [
        {
          label: label,
          data: data[1],
          backgroundColor: data[2] ? data[2] : null,
          
        },
      ],
      labels: data[0],
    },
    options: {
      plugins: {
        title: {
          font:{
            size: 20
          },
          display: true,
          text: title,
        },
      },
    },
  });
};

export const timeMiner = (time: string) => {
  const timeArray = time.split(":");
  const hours = parseInt(timeArray[0]);

  if (hours >= 5 && hours < 12) return "at morning";
  else if (hours >= 12 && hours < 4) return "at afternoon";
  else return "at evening";
};


export const getDateArray = (date: Date)=>{
  let dateArray:  string[] = [...Array(7)];
  const tempDate = date.toJSON().slice(0,10).split('-').reverse();
  tempDate[1][0] === '0' ? tempDate[1] = tempDate[1][1] : tempDate[1] = tempDate[1];
  dateArray[0] = tempDate.join('-');
  
  for(let i=1; i<7; i++){
      date.setDate(date.getDate() + 1)
      const tempDate = date.toJSON().slice(0,10).split('-').reverse();
      tempDate[1][0] === '0' ? tempDate[1] = tempDate[1][1] : tempDate[1] = tempDate[1];
      dateArray[i] = tempDate.join('-');
    }
    
  return dateArray;
}

export const getDaysofWeek = (day: number)=>{
  // get the name of the day of the week as a string array with respect to date
  const days = [
    'Sunday',
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday'
  ];
  let dateArray:  string[] = [...Array(7)];
  dateArray[0] = days[day];
  for(let i=1; i<7; i++){
    if(day === 6){
      day = 0;
    }
    else{
      day++;
    }
    dateArray[i] = days[day];
  }

  
  return dateArray;
}

export const getTimings = ()=>{
  return [
    "8:00",
    "8:30",
    "9:00",
    "9:30",
    "10:00",
    "10:30",
    "11:00",
    "11:30",
    "12:00",
    "12:30",
    "13:00",
    "13:30",
    "14:00",
    "14:30",
    "15:00",
    "15:30",
    "16:00",
    "16:30",
    "17:00",
    "17:30",
    "18:00",
    "18:30",
    "19:00",
    "19:30",
    "20:00",
  ]
}


export const getSlotMatrix = (slot: {date: string, slots: string[]}[], timings: string[])=>{
  const slotMatrix: number[][] = [...Array(7)].map((e, index) => Array(timings.length - 1).fill(0));
  slot.map((slot, index)=>{
    slot.slots.map((slot)=>{
      const time = slot.split(' ')[0].split('-');
      const slotIndex1 = timings.indexOf(time[0]);
      const slotIndex2 = timings.indexOf(time[1]) - 1;
      // make slot = 1 from slotIndex1 to slotIndex2
      for(let i=slotIndex1; i<=slotIndex2; i++){
        slotMatrix[index][i] = 1;
      }
    }
    )
  })
  return slotMatrix;
}