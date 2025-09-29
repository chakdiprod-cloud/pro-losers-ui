"use client";
import React from "react";
export function Button({className="",children,...props}){return(<button className={`px-4 py-2 rounded-2xl font-semibold transition-transform duration-200 active:scale-95 ${className}`} {...props}>{children}</button>)}