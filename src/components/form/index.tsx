import React from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { Formik } from 'formik'
import * as Yup from 'yup'
import { Dialog } from 'react-native-paper'

import Input from './inputs'
import Button from '../common/Button'

export default function Form(props) {
  if (!props.schema) return <Text>please provide schema</Text>
  return (
    <Formik
      initialValues={props.initialValues || {}}
      onSubmit={values => {
        props.onSubmit(values)
      }}
      validationSchema={validator(props.schema)}
    >
      {({ handleChange, handleBlur, handleSubmit, values, setFieldValue, errors, dirty, isValid }) => {
        return (
          <View style={styles.wrap}>
            <View style={{ ...styles.topper, padding: props.nopad ? 0 : 25 }}>
              {props.schema.map(item => {
                const readOnly = props.readOnlyFields && props.readOnlyFields.includes(item.name)
                return (
                  <Input
                    key={item.name}
                    {...item}
                    accessibilityLabel={`form-input-${item.name}`}
                    value={values[item.name]}
                    displayOnly={props.displayOnly || readOnly}
                    handleChange={handleChange}
                    handleBlur={handleBlur}
                    setValue={data => setFieldValue(item.name, data)}
                    error={errors[item.name]}
                  />
                )
              })}
            </View>
            {!props.displayOnly && (
              <View style={styles.buttonWrap}>
                <Button mode='contained' accessibilityLabel={'form-button'} onPress={handleSubmit} disabled={!props.forceEnable && (!dirty || !isValid)} style={styles.button} loading={props.loading}>
                  {props.buttonText || 'Submit'}
                </Button>
              </View>
            )}
            {props.action && <Action onSave={handleSubmit} loading={props.loading} disabled={!props.forceEnable && (!dirty || !isValid)} accessibilityLabel={'form-button'} />}
          </View>
        )
      }}
    </Formik>
  )
}

function Action(props) {
  return (
    <Dialog.Actions>
      <Button mode='text' btnHeight={40} onPress={props.onSave} loading={props.loading} disabled={props.disabled} accessibilityLabel={'form-button'}>
        Save
      </Button>
    </Dialog.Actions>
  )
}

function validator(config) {
  const shape = {}
  config.forEach(field => {
    if (typeof field === 'object') {
      shape[field.name] = field.validator
    }
  })
  return Yup.object().shape(shape)
}

const styles = StyleSheet.create({
  wrap: {
    // flex: 1,
    // width: '100%'
    // height: '100%',
    // justifyContent: 'space-between',
    // position: 'relative'
    // minHeight:420
  },
  topper: {
    // width: '100%',
    // flex: 1,
    // paddingBottom: 75,
    minHeight: 100
  },
  buttonWrap: {
    // width: '100%'
    // maxHeight: 60
    // flexDirection: 'row-reverse',
    // justifyContent: 'center'
    // zIndex: 1000,
    // position: 'absolute',
    // bottom: 10,
    // left: 0,
    // right: 0
  },
  button: {
    borderRadius: 30,
    height: 60,
    display: 'flex',
    justifyContent: 'center',
    zIndex: 999,
    position: 'relative'
  }
})
