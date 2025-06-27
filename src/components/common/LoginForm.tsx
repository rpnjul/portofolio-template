"use client"
import { useState } from "react";
import { toast } from "react-toastify";
import Image from "next/image";

const LoginForm = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const handleSubmit = async (e: React.FormEvent) => {
      e.preventDefault();
      try {
            const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/login`,
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({ username, password }),
                }
            );
            if (!res.ok) {
                throw new Error("Login failed");
            }
            const data = await res.json();
            if(data.status){
                console.log("Login success:", data);
                toast('Finally! I can access my own web');
            } else {
                toast(<WrongLogin />);
            }
        } catch (error) {
            console.error("Login error:", error);
            toast(<WrongLogin />);
        }
    };
    const WrongLogin = () => {
        return (
            <div className="flex items-center gap-3">
                <Image
                    width={0}
                    height={0}
                    sizes={"100vw"}
                    src={`${process.env.NEXT_PUBLIC_BASE_URL}/assets/img/monkey.jpg`}
                    alt="monkey"
                    className="w-16 h-16 object-cover rounded-full"
                />
                <div className="text-sm text-white">
                    
                    <p className="font-semibold">{`DON'T LIE. THIS IS YOU, RIGHT?`}</p>
                </div>
            </div>
        );
        
    }
    return (
        <form
            className="space-y-6"
            action="#"
            method="POST"
            onSubmit={handleSubmit}
        >
            <div>
                <label className="block text-sm/6 font-medium ">Username</label>
                <div className="mt-2">
                    <input
                        type="username"
                        name="username"
                        id="username"
                        required
                        className="block w-full rounded-md text-gray-400 px-3 py-1.5 text-base  outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                        placeholder="Username"
                        onChange={(e) => setUsername(e.target.value)}
                    />
                </div>
            </div>
            <div>
                <div>
                    <label className="block text-sm/6 font-medium ">Password</label>
                </div>
                <div className="mt-2">
                    <input
                        type="password"
                        name="password"
                        id="password"
                        required
                        placeholder="******"
                        className="block w-full rounded-md text-gray-400 px-3 py-1.5 text-base  outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </div>
            </div>
            <div>
                <button
                    type="submit"
                    className="flex w-full justify-center rounded-md px-3 py-1.5 text-sm/6 font-semibold text-white shadow-xs hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                    style={{ backgroundColor: "#3b82f6" }}
                >
                    Sign in
                </button>
            </div>
        </form>
    );
}

export default LoginForm;