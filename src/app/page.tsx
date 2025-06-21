"use client";
import Aboutus from '@/components/aboutus';
import FAQ from '@/components/FAQ';
import Footer from '@/components/Footer';
import Hero from '@/components/hero';
import Hitws from '@/components/hiws';
import CarouselDemo from '@/components/knowyourrights';
import NavbarDemo from '@/components/navbar';
import { useState, useEffect, useRef } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";

import{
  X,
  MessageCircle,
  Send,
  Loader2,
  ArrowDownCircleIcon,
} from "lucide-react";

import {
  motion,
  AnimatePresence
} from "framer-motion";
import { useChat} from "@ai-sdk/react"; 


export default function Home() {

  const [isChatOpen, setIsChatOpen] = useState(false);
  const [showChatIcon, setShowChatIcon] = useState(false);
  const chatIconRef = useRef<HTMLButtonElement>(null);

  const {
    messages,
    input,
    handleInputChange,
    handleSubmit,
    isLoading,
    stop,
    reload,
    error,
  } = useChat({ api: "/api/gemini" });

  useEffect(() => {

    const handleScroll = () => {
      if (window.scrollY > 200) {
        setShowChatIcon(true);
      } else {
        setShowChatIcon(false);
        setIsChatOpen(false);
      }
    }

    handleScroll();

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };

  }, []); 


  const toggleChat = () => {
    setIsChatOpen(!isChatOpen);
  };
  
  return (
    <main className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-red-200 to-red-100 text-center p-8">
      
      <NavbarDemo />
      <Hero />
      <h1 id="aboutus" className="text-4xl  p-5 font-bold text-center mt-[80px] text-primary ">
             ABOUT US
      </h1>
      <Aboutus />
      <h1 id='kyr' className="text-4xl  p-5  font-bold text-center mt-[80px] text-primary ">
             KNOW YOUR RIGHTS
      </h1>
      <CarouselDemo />
      <h1 id="hitws" className="text-4xl font-bold text-center mt-[80px] text-primary ">
             HOW IT WORKS
      </h1>
      <Hitws />
      <h1 id='faqs' className="text-4xl  p-5  font-bold text-center mt-[80px] text-primary ">
             FREQUENTLY ASKED QUESTIONS
      </h1>
      <FAQ />
      <Footer />
      <AnimatePresence>
        {showChatIcon && (
          <motion.div
          initial={{ opacity: 0, y: 100 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 100 }}
          transition={{ duration: 0.2 }}
          className="fixed bottom-4 right-4 z-50">
            <Button 
              ref={chatIconRef} 
              onClick={toggleChat} 
              size="icon" 
              className="rounded-full size-14 shadow-lg ">
              {!isChatOpen ? (
                <MessageCircle className="size-12" />
              ) : (
                <ArrowDownCircleIcon />
              )}
            </Button>
          </motion.div>
        )}
      </AnimatePresence>
      <AnimatePresence>
        {isChatOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.2 }}
            className="fixed bottom-20 right-4 z-50 w-[95%] md:w-[500px]">
              <Card className="border-2 bg-white">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3">
                  <CardTitle className="text-lg font-bold">
                    LokAwaaz ChatBot
                  </CardTitle>
                  <Button
                    onClick={toggleChat}
                    size="sm"
                    variant="ghost"
                    className="rounded-full size-14 p-2 shadow-lg">
                      <X className="size-4" />
                      <span className="sr-only">Close Chat</span>                    </Button>
                </CardHeader>
                <CardContent>
                  <ScrollArea className="h-[300px] pr-4">
                    {messages?.length === 0 && (
                      <div className="w-full mt-32 text-gray-500 items-center justify-center flex gap-3">
                      No Message Yet
                    </div>
                    )}
                    {messages?.map((message, index) => (
                      <div
                        key={index}
                        className={`mb-4 ${
                          message.role === "user" ? "text-right" : "text-left"
                        }`}>
                          <div
                            className={`inline-block pl-3 pr-3 pt-1 pb-1 rounded-lg ${
                              message.role === "user"
                              ? "bg-chatbot text-black"
                              : "bg-gray-100"
                            }`}>
                          <ReactMarkdown
                            children={message.content}
                            remarkPlugins={[remarkGfm]}
                            components={{
                              code({ node, className, children, ...props }) {
                                  const isInline = (node as any)?.inline;
                                  return isInline ? (
                                      <code className="bg-gray-200 px-1 rounded" {...props}>
                                          {children}
                                      </code>
                                  ) : (
                                      <pre className="bg-gray-200 p-2 rounded" {...props}>
                                          <code>{children}</code>
                                      </pre>
                                  );
                              },

                              ul: ({ children }) => (
                                <ul className="list-disc ml-4">{children}</ul>
                              ),
                              ol: ({ children }) => (
                                <li className="list-decimal ml-4">{children}</li>
                              )
                            }}/>
                            </div>

                        </div>
                    ))}
                    {isLoading && (
                      <div className="w-full items-center flex justify-center gap-3">
                        <Loader2 className="animate-spin h-5 w-5 text-black" />
                        <button
                          className="underline"
                          type="button"
                          onClick={() => stop()}>
                            abort
                          </button>
                      </div>
                    )}
                    {error && (
                      <div className="w-full items-center flex justify-center gap-3">
                        <div>An Error occurred. Please Chehck if you are done the authentication or not then</div>
                        <button
                          className="underline"
                          type="button"
                          onClick={() => reload()}>
                            Retry
                          </button>
                      </div>
                    )}
                  </ScrollArea>
                </CardContent>
                <CardFooter>
                  <form
                    onSubmit={handleSubmit}
                    className="flex w-full items-center space-x-2">
                      <Input 
                        value={input}
                        onChange={handleInputChange}
                        className="flex w-[400px]"
                        placeholder="Type Your Message Here..." />
                      <Button
                        type="submit"
                        className="size-9"
                        disabled={isLoading}
                        size="icon">
                          <Send className="size-4" />
                        </Button>
                    </form>
                </CardFooter>
              </Card>
            </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
}