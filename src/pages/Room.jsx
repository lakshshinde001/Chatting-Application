import React, {useEffect, useState} from 'react'
import client,{databases, DATABASE_ID, COLLECTION_ID_MESSAGES} from '../appriteConfig.js'
import { ID, Query } from 'appwrite'
import Header from '../components/Header.jsx'
import '../index.css'

import {Trash2} from 'react-feather'

const Room = () => {

    const [messages, setMessages] = useState([]);
    const [messageBody, setMessageBody] = useState('');

    useEffect(() => {
        getMessages();
       
       
       const unsubscribe = client.subscribe(`databases.${DATABASE_ID}.collections.${COLLECTION_ID_MESSAGES}.documents`, response => {
            // console.log("RealTime : " , response);
            if(response.events.includes("databases.*.collections.*.documents.*.create")){
                console.log("A Message was created ");
                setMessages(prevState => [response.payload, ...prevState])
            }

            if(response.events.includes("databases.*.collections.*.documents.*.delete")){
                console.log("A Message was deleted");
                setMessages(prevState => prevState.filter(message => message.$id !== response.payload.$id))
            }
        })
        return  () =>{
            unsubscribe();
        }
       
    }, [])

    const handleSubmit = async (e) => {
        e.preventDefault();

        let payload = {
            body : messageBody
        }
        let response = await databases.createDocument(
            DATABASE_ID,
            COLLECTION_ID_MESSAGES,
            ID.unique(),
            payload,
           
        )

        // console.log("Created",response);

        // setMessages(prevState => [response, ...messages])

        setMessageBody('')

    }

    const getMessages = async () => {
       const response =  await databases.listDocuments(
        DATABASE_ID,
        COLLECTION_ID_MESSAGES,
        [
            Query.orderDesc('$createdAt'),
            Query.limit(5)
        ]
    );

    //    console.log(`RESPONSE : `, response);
    setMessages(response.documents);
    }

    const deleteMessage = async (message_id) => {
        databases.deleteDocument(DATABASE_ID, COLLECTION_ID_MESSAGES, message_id)
        // setMessages(prevState => messages.filter(message => message.$id !== message_id))
    }

  return (
    <main className='container'>
        <Header/>
        <div className='room--container'>
            
            <form  onSubmit={handleSubmit} id='message--form'>
                <div>
                    <textarea
                        required
                        maxLength='1000'
                        placeholder='Say Something...'
                        value={messageBody}
                        onChange={(e) => {setMessageBody(e.target.value)}}
                    >

                    </textarea>
                </div>

                <div className='send-btn--wrapper'>
                    <input type='submit' value='Send' className='btn tox-button--secondary' />
                </div>

            </form>

            <div>
                {messages.map((message) => (
                    <div key={message.$id} className='messages-wrapper'> 

                        <div className='message--header'>
                            <small className='message-timestamp'> {new Date(message.$createdAt).toLocaleString()} </small>

                            <Trash2 
                                className='delete--btn'
                                onClick={() => {deleteMessage(message.$id)}} 
                            />
                          
                        </div>    

                        <div className='message--body'> 
                            <span> {message.body} </span>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    </main>
  )
}

export default Room