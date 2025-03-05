"use client";

import { useEffect, useState } from "react";

const POSSIBLE_MIMETYPE = ["video/mp4", "video/webm"];


const getSupportedMimeTypes = () => {
    return POSSIBLE_MIMETYPE.filter((mimeType) => {
        try {
            return MediaRecorder.isTypeSupported(mimeType);
        } catch {
            return false;
        }
    });
};


export default function SupportType() {
    const [supportedTypes, setSupportedTypes] = useState<string[]>([]);
    useEffect(() => {
        const supportedTypes = getSupportedMimeTypes();
        // console.log("supportedTypes!!!!!!!!!", supportedTypes);
        setSupportedTypes(supportedTypes);
    }, []);


    return <div>SupportType

        <div>
            {supportedTypes.map((type) => (
                <div key={type}>{type}</div>
            ))}
        </div>
    </div>;
}
