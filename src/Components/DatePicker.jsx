import React, { useState } from 'react'
import { Text, StyleSheet } from 'react-native'
import DatePicker from 'react-native-date-picker'

export default  ({changeProp}) => {
  const [date, setDate] = useState(new Date())
  const [open, setOpen] = useState(false)

  const formatDate = (date) => {
    const day = date.getDate()
    const month = date.getMonth() + 1
    const year = date.getFullYear()
    return `${day}/${month}/${year}`
  }
  // console.log(formatDate, formatDate(date), date)
const minimumDate = new Date(1920,0,1);

  return (
    <>
      <Text style={styles.input} 
      onPress={() => setOpen(true)}>
        {formatDate(date)} 
      </Text>
      <DatePicker
        modal
        mode="date"
        open={open}
        date={date}
        onConfirm={(date)  => {
          setOpen(false)
          setDate(date)
          changeProp(formatDate(date))
        }}
        onCancel={() => {
          setOpen(false)
        }}
        theme='dark'
        maximumDate={new Date()}
        minimumDate={minimumDate}
      />
    </>
  )
}

const styles=StyleSheet.create({
  input: {
    height: 40,
    borderWidth: 1,
    borderColor: "gray",
    borderRadius: 20,
    padding:10,
    paddingHorizontal:15,
    marginHorizontal : 40,
    color:"white",
    // textAlign: "center"
}, }
)