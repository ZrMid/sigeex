/* eslint-disable no-unused-vars */
import { Document, Text, Page, StyleSheet, Image } from '@react-pdf/renderer'
import { useState } from 'react'

function PDF(info) {

    const [infoExamen, setInfoExamen] = useState({});

    const info = {
        materia: "Materia",
        nombre: "NombreExamen",

    }
    return (
        <Document>
            <Page>
                <Text>

                </Text>
            </Page>
        </Document>
    )
}