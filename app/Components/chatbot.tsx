"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import ChatBotPNG from "../Assets/chatbot.png";
import { BsFillSendFill } from "react-icons/bs/index";
import "../globals.css";
import axios from "axios";
import "../globals.css";

function Chatbot() {
  const [start, setStart] = useState<Boolean>(true);
  const [text, setText] = useState<any>("");
  const [test, setTest] = useState<any>(false);
  const [img, setImg] = useState<any>([]);

  const [msg, setMsg] = useState<any>([
    {
      role: "assistant",
      content: "Hey! How can i help you?",
    },
    {
      role: "user",
      content: "I want a party wear shirt",
    },
    {
      role: "assistant",
      content:
        "Hey there! Sure, I can help you find a party wear shirt. Could you please let me know what kind of party you're attending? Is it a formal event or a casual one?",
    },
    {
      role: "user",
      content:
        "I want to attend my college farewell party. So I need a format outfit",
    },
    {
      role: "assistant",
      content:
        "That sounds exciting! For your college farewell party, a formal outfit would be a great choice. Do you have any specific color preferences for the shirt? And what is your size?",
    },
    {
      role: "user",
      content: "Thanks! I would prefer a classy black shirt.",
    },
    {
      role: "assistant",
      content:
        "You're welcome! A classy black shirt sounds perfect for a formal occasion. Could you please let me know your size? Is it small, medium, large, or any specific measurements?",
    },
    {
      role: "user",
      content: "No, it's ok ignore the size",
    },
    {
      role: "assistant",
      content:
        "Alright, I'll keep that in mind. Now, do you have any particular style in mind for the shirt? For example, do you prefer a plain black shirt or one with some pattern or design?",
    },
    {
      role: "user",
      content:
        "I would prefer a patterned black shirt which would be a statement piece",
    },
    {
      role: "assistant",
      content:
        "Got it! A patterned black shirt will definitely make a statement at your college farewell party. Is there any specific pattern or design you have in mind? For example, stripes, polka dots, floral, or something else?",
    },
    {
      role: "user",
      content: "Anything would do. No more questions please!",
    },
    {
      role: "assistant",
      content:
        "No problem at all! I have all the information I need. I'll find you a patterned black shirt that will make a statement at your college farewell party. If you have any other requests or need any further assistance, feel free to let me know. Otherwise, I'll get right on it!",
    },
    {
      role: "user",
      content: "Yes please go ahead. Give me the output now",
    },
    {
      role: "assistant",
      content: "\nflipkart_query: Party wear black patterned shirt\n",
    },
    {
      role: "user",
      content: "Suggest me some matching trousers for the same...",
    },
    {
      role: "assistant",
      content:
        "Sure! I can help you find matching trousers for your party wear black patterned shirt. Could you please let me know what type of trousers you prefer? Are you looking for formal trousers or something more casual?",
    },
    {
      role: "user",
      content:
        "Anything that would pair well with the above shirt. No other preference.",
    },
    {
      role: "assistant",
      content:
        "Great! I'll find you some trousers that will pair well with your party wear black patterned shirt. Do you have any specific color in mind for the trousers?",
    }
  ]);

  const msgUpdate = async () => {
    const newMsg: any = [
      ...msg,
      {
        role: "user",
        content: text,
      },
    ];
    setMsg(newMsg);
    setText("");
    await axios
      .post("https://8565-206-84-225-155.ngrok-free.app/", newMsg, {
        headers: { "Access-Control-Allow-Origin": "*" },
      })
      .then(res => {
        if (res.data?.fetch_from) {
          // Display images
          setImg(res.data.result);
          setTest(true);
        }
        setMsg((messages: any) => [...messages, res.data.message]);
      })
      .catch(err => {
        console.log(err);
      });
  };
  useEffect(() => {
    setTimeout(() => {
      setStart(false);
    }, 2000);
  }, []);
  return (
    <main className="p-5 grid grid-rows-6 gap-5 rounded-2xl bg-[#2f2f2f] ">
      {start ? (
        <div className="w-full row-span-5  p-5 flex flex-col  rounded-2xl justify-center items-center">
          <Image src={ChatBotPNG} alt="png image" width={400} height={400} />
          <h2 className="text-center">
            Lets start designing your outfit with us...
          </h2>
        </div>
      ) : (
        <div className="max-h-[400px] h-[400px] w-full row-span-5  p-5 flex flex-col  rounded-2xl overflow-y-scroll gap-5">
          {msg.map((msg: any) => {
            if (msg.role === "assistant")
              return (
                <div className="msgAss">
                  <h1>Assistant :</h1>
                  <h3 className="m-3">{msg.content}</h3>
                </div>
              );
            else {
              return (
                <div className="msgUser">
                  <h1>User :</h1>
                  <h3 className="m-3">{msg.content}</h3>
                </div>
              );
            }
          })}
          {img.map((img: any) => {
            if (test) {
              return (
                <a href={img.link} className="cursor-pointer " target="_blank">
                  <Image
                    src={img.thumbnail}
                    width={300}
                    height={300}
                    alt=""
                    priority={true}
                  />
                </a>
              );
            }
          })}
        </div>
      )}
      <div className="w-full row-span-1">
        <div className="bg-[#181818] p-5 rounded-2xl flex justify-center items-center gap-5">
          <input
            type="text"
            className="bg-[#0000] focus:outline-0 text-[#DfD7Df] w-3/4"
            placeholder="Lets start designing... "
            value={text}
            onChange={e => setText(e.target.value)}
          />
          <BsFillSendFill
            className="text-[ #DfD7Df] cursor-pointer w-[25px] h-[25px]"
            onClick={msgUpdate}
          />
        </div>
      </div>
    </main>
  );
}

export default Chatbot;
