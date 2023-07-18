import {db} from '../../../components/general/firebase-config.js';
import { getDoc, doc, setDoc } from 'firebase/firestore';

export default async function handler(req, res){
    const {id, age, occupation, refferedBy, medicalHistory, surgicalHistory, personalHistory, familyHistory, packSize, patientNote, doctorNote} = req.body;
    let inputData = {};
    if(age && typeof(age) === 'number' && age >= 0 && age <= 150) inputData.age = age;
    if(occupation && typeof(occupation) === 'string') inputData.occupation = occupation;
    if(refferedBy && typeof(refferedBy) === 'string') inputData.refferedBy = refferedBy;
    if(medicalHistory && typeof(medicalHistory) === 'string') inputData.medicalHistory = medicalHistory;
    if(surgicalHistory && typeof(surgicalHistory) === 'string') inputData.surgicalHistory = surgicalHistory;
    if(personalHistory && typeof(personalHistory) === 'string') inputData.personalHistory = personalHistory;
    if(familyHistory && typeof(familyHistory) === 'string') inputData.familyHistory = familyHistory;
    if(packSize && typeof(packSize) === 'number') inputData.packSize = packSize;
    if(patientNote && typeof(patientNote) === 'string') inputData.patientNote = patientNote;
    if(doctorNote && typeof(doctorNote) === 'string') inputData.doctorNote = doctorNote;
    try {
        const refDoc = doc(db, 'Userdata', id);
        const findDoc = await getDoc(refDoc);
        const data = findDoc.data();
        const newData = {
            ...data,
            ...inputData,
        }
        if(findDoc.exists()){
            await setDoc(doc(db, 'Userdata', id), newData);
            res.json({updatedDoc:newData});
        }
        else res.json({message:'document not found'});
    } catch (error) {
        res.json({message : error});
    }
}