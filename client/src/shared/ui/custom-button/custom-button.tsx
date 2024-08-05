'use client'
import React, { CSSProperties, FC } from 'react'
import { Button as AntButton } from 'antd'

interface CustomButtonProps {
  title: string
  size?: 'large' | 'middle' | 'small'
  type?: 'primary' | 'dashed' | 'link' | 'text' | 'default'
  styles?: CSSProperties
  classNames?: string
  disabled?: boolean
  hide?: boolean
  onClick?: () => void
  danger?: boolean
  loading?: boolean
}

const CustomButton: FC<CustomButtonProps> = ({
  title,
  size = 'middle',
  type = 'default',
  styles = {},
  classNames,
  disabled = false,
  hide = false,
  onClick,
  danger,
  loading = false,
}) => {
  const onButtonClick = () => {
    onClick?.()
  }

  if (hide) {
    return null
  }

  return (
    <AntButton
      size={size}
      type={type}
      style={{ ...styles }}
      className={classNames}
      disabled={disabled}
      danger={danger}
      onClick={onButtonClick}
      loading={loading}
    >
      {title}
    </AntButton>
  )
}

export default CustomButton
