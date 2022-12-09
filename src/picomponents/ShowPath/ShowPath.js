import React from 'react'
import { Link } from 'react-router-dom'
import "./index.css"

const ShowPath = (props) => {
    return (
        <div className={`pathshowercover ps-md-2 ${props.className}`}>
            <div className={`pathshower cursor-pointer ${props.pathshowerClass}`} >
                <Link to={props.homeLink || "/"}>Home    </Link>
                {props.path && props.path.map((e, i) => {
                    if(e && JSON.parse(e)){
                        e = JSON.parse(e)
                        return <Link to={e.link} key={i}>{">"} {e.label}</Link>
                    }
                    return ""
                })}
            </div>
        </div>
    )
}

export default ShowPath
