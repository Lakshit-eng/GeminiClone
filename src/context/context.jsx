import { createContext, useState } from "react";
import run from "../config/gemini";

export const Context = createContext();

const ContextProvider =(props)=>{ 
    const [input, setInput] = useState("");      //to save the input data
    const [recentPrompt, setRecentPrompt] = useState("");     //when we will click send button the input data will be saved in recent prompt
    const [previousPrompts, setPreviousPrompts] = useState([]); //we will use it to store all the input history and display ir=t in the recent tab
    const [showResult, setShowResult] = useState(false);   //once it is true it will hif=de the greet text and boxes and show the output to the user
    const [loading, setLoading] = useState(false);   //when this will be true it will create a loading animation and after getting data we will make it false
    const [resultData, setResultData] = useState(""); //this will help us to display the results into our webpage
    
   const delayPara =(index,nextWord)=>{
       setTimeout(()=>{
           setResultData(prev=>prev+nextWord);
       },75*index)
   }

   const newChat =()=>{
    setLoading(false);
    setShowResult(false);
   }

    const onSent = async(prompt)=>{
      
       setResultData("")
       setLoading(true)
       setShowResult(true)
       let response;
       if(prompt!==undefined){
         response=await run(prompt);
         setRecentPrompt(prompt)
       }
       else{
        setPreviousPrompts(prev=>[...prev,input])
        setRecentPrompt(input)
        response =  await run(input)
       }
       
       let responseArray =response.split("**");
       let newResponse="";
       for(let i=0;i<responseArray.length;i++){
        if(i===0||i%2!==1){
              newResponse+= responseArray[i];
        }
        else{
          newResponse +="<b>"+responseArray[i]+ "</b>";
        }
       }
        let newResponse2 = newResponse.split("*").join("</br>");

       let newResponseArray = newResponse2.split(" ");
       for(let i=0;i<newResponseArray.length;i++){
             const nextWord = newResponseArray[i];
             delayPara(i,nextWord+" ");
       }
       setLoading(false)
       setInput("")
    }
    
const contextValue ={
   previousPrompts,
   setPreviousPrompts,
   onSent,
   setRecentPrompt,
   recentPrompt,
   showResult,
   loading,
   resultData,
   input,
   setInput,
   newChat
}
return (
    <Context.Provider value={contextValue}>
      {props.children}
    </Context.Provider>
  );

}
export default ContextProvider;