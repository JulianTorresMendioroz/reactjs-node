import { useEffect, useState } from "react"

export default function DataUsers () {

    const [users, setUsers] = useState([]);

    useEffect(() => {
        try {
            fetch("http://localhost:8081/api/users")
            .then(data => data.json())
            .then(data => console.log(data))
            
        } catch (error) {
            console.log('error:', error)
        }
    }, [])
   
    return (
        <>
        <h1>{}</h1>
        </>
    )
}