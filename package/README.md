# EasyNextAuth

Easily Manage Authentication In Your Next.js Apps

# Client

**AuthProvider**

first, we import the AuthProvider Component and wrap the main layout with the component and provide an API endpoint as value to the userData prop we will use this endpoint to retrieve user personal data for the client to consume

    return (
        <AuthProivder userData='http://localhost:3000/api/me' >
    	    <html  lang='en'>
    			 <body  className={inter.className}>{children}</body>
    		</html>
        <AuthProivder/>
    )

**The AuthorizeClient Function**

on your login or register page import AuthorizeClient Function
and pass fromData to validate and redirect path to redirect the client after validating the data and creating the token, lastly pass an API endpoint you define to handle login or register the response should contain only the token

    <form
      onSubmit={async (e) => {
        e.preventDefault();
        let form: FormData = new FormData(e.currentTarget);
    	await AuthroizeCLiet('http://localhost:3000/api/login','/home',form)
      }}
    >

**GetUser Function**

To consume the userData in your client import the GetUser Function anywhere in your app if the client isn't authorized it will return undefined otherwise, it will return the userData it can also use to protect client routes

    export default function ProtectedRoute (){
        let data = GetUser();
        if(!data) return router.replace('/login')
    	return <div>{data.username}</data>
    }

# Server

**Secret**

first, in .env file, we create AUTH_SECRET key with any value that can be used as a secret

    AUTH_SECRET=as2?<>KJ34@#odp349582@#1qwe

**Authenticate Function**

in your login or register route after validating the form or saving the user in the database it's time to generate a token call the Authenticate function and pass a payload the payload should be an object and don't put sensitive information in the payload, ex the user password lastly, the route method should be POST method

real-world example

    import { NextResponse } from "next/server";
    import Joi, { Schema } from "joi";
    import hashing from "bcrypt";
    import { db } from "@/db/db";
    import { Artists } from "@/db/schema";
    import { eq } from "drizzle-orm";
    import Authenticate from "easynextauth/server/authenticate";

    export async function POST(req: Request) {
    	let form = await req.formData();
    	let email = form.get("email")
        let password = form.get("password")

    	const schema: Schema = Joi.object({
           email: Joi.string()
          .email({ tlds: { allow: false } })
          .required()
          .min(8)
          .max(120)
          .label("Email"),
           password: Joi.string().required().min(8).max(120).label("Password"),
        });

        const { error } = schema.validate({email,password});
    	if (error) return new Response(error.message, { status: 400 });

        try {
    	    let artist = await db
    		    select({
                id: Artists.id,
                email: Artists.email,
                password: Artists.password,
              })
              .from(Artists)
              .where(eq(Artists.email, data.email));

        if (artist.length === 0) {
          return new Response("Email Doesn't Exist", { status: 400 });
        }

        let hashed_pass: boolean = await hashing.compare(
          data.password,
          artist[0].password!
        );

        if (!hashed_pass) {
          return new Response("Invalid Password", { status: 400 });
        }

        let token = await Authenticate({id:artist[0].id!})

        return new Response(token, { status: 200 });

       } catch (error) {
        return new Response("Something Wrong Happen", { status: 400 });
      }
    }``

**Protect Routes**

To protect routes in your middleware file import the GetPayload Function the function returns the payload if the token you provide is a valid token otherwise it returns an error

real-world example

    import { NextResponse } from "next/server";
    import type { NextRequest } from "next/server";
    import GetPayload from "easynextauth/server/getPayload";

    export async function middleware(request: NextRequest) {

      try {
        await GetPayload();
        return NextResponse.next();
      } catch (error) {
        return new Response("Invalid Token", { status: 400 });
      }
    }

    export const config = {
      matcher: [
        "/api/me",
        "/api/follow/:path*",
        "/api/unfollow/:path*",
        "/api/like/:path*",
        "/api/dislike/:path*",
        "/api/comment/:path*",
        "/api/upload",
      ],
    };

**userData Route**

On the client side we add to the AuthProvider component a prop with an API endpoint as a value to retrieve personal data let's define a route for this prop I'm gonna call the route 'me' The route should return the data you want the client to consume you can protect this route from the middleware or call the GetPayload if it throws an error response to the client with the error else it will return the payload and that's what we want I added the user id to the payload so we can use this id to retrieve user data or do other operation
make sure its GET method

real-world example

    import { NextResponse } from "next/server";
    import { db } from "@/db/db";
    import { Artists } from "@/db/schema";
    import { eq } from "drizzle-orm";
    import GetPayload from "easynextauth/server/getPayload";

    export async function GET(req: Request) {

      try {
        let payload = await GetPayload();
        let result = await db
          .select({
            id: Artists.id,
            name: Artists.name,
            followers: Artists.followers,
            following: Artists.following,
            songs: Artists.songs,
            cover: Artists.cover,
          })
          .from(Artists)
          .where(eq(Artists.id, payload.id));

        if (result.length === 0) return new Response("Something Wrong Happen", { status: 400

        return NextResponse.json(result[0]);

      } catch (error) {
        return new Response("Something Wrong Happen", { status: 400 });
      }
    }

# Providers (Soon)
