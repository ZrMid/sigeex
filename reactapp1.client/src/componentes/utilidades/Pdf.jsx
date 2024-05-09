/* eslint-disable no-unused-vars */
import { Document, Text, Page, StyleSheet, View } from '@react-pdf/renderer'
import { useState } from 'react'

function Pdf({ nombreExamen, fechaInicio, fechaTermino, reactivos, usuario }) {

    const styles = StyleSheet.create({
        page: {
            padding: ' 40px',
            display: 'flex',
            flexDirection: 'column',
            gap: '30px'
        },
        header: {
            display: 'flex',
            flexDirection: 'column',
            gap: '15px'
        },
        titulo:{
            display: 'flex',
            justifyContent: 'center',
            fontWeight: 'bold'
        },
        reactivos:{
            display:'flex',
            flexDirection: 'column',
            gap: '30px'
        },
        reactivo:{
            paddingBottom:'60px'
        }


    })

    return (
        <Document>
            <Page style={styles.page}>
                <View style={styles.header}>
                    <Text style={styles.titulo}>
                        {nombreExamen}
                    </Text>
                    <Text>
                        Fecha: {fechaInicio.slice(0, 10)}
                    </Text>
                    <Text>
                        Nombre: _____________________________ Calif: ______
                    </Text>
                </View>
                <View style={styles.reactivos}>
                    {
                        reactivos.map((reactivo, idx) => (
                            <Text style={styles.reactivo}>
                                {idx+1} - {reactivo['reactivo']}
                            </Text>
                        ))
                    }
                </View>

            </Page>
        </Document>
    )
}

export default Pdf;