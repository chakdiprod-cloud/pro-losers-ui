"use client";
export function Button({className="",...props}){return(<button className={`px-4 py-2 rounded-2xl font-semibold transition-transform active:scale-95 ${className}`} {...props} />)}