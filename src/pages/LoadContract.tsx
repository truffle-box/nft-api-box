// @ts-ignore
import { TEMPLATES } from '@infura/sdk'
import React, { FormEvent, useCallback, useRef, useState } from 'react'
import CategorySelector from 'components/molecules/CategorySelector'
import { LabeledInput as Input } from 'components/atoms/Input'
import { useInfuraSdk } from 'hooks/useInfuraSdk'
import { useStore } from 'state'

const LoadContract = () => {

  const sdk = useInfuraSdk()
  const { setContractInstance } = useStore()

  const [selectedCategory, setSelectedCategory] = useState('')
  const [selectedContract, setSelectedContract] = useState('')
  const formRef = useRef<HTMLFormElement>(null)

  const templates = ['Unlimited']

  const wenSubmit = useCallback(() => async (e: FormEvent<HTMLFormElement>) => {
    if (!sdk) {
      alert('No Infura SDK configured!')
      return
    }
    if (!selectedCategory) {
      alert('Please select a template')
      return
    }

    e.preventDefault()
    const contract = await sdk.loadContract({
      template: TEMPLATES.ERC721Mintable,
      contractAddress: selectedContract
    })

    setContractInstance(contract)
  }, [sdk])

  return (
    <>
      <fieldset>
        <legend>
          <h2 style={{ fontWeight: '900' }}>Load an existing Contract</h2>
          <p>Select one of the templates below to load an existing contract</p>
        </legend>
      </fieldset>
      <fieldset>
        <form action="" ref={formRef} onSubmit={wenSubmit}>
          <CategorySelector
            categories={templates}
            selectedCategory={selectedCategory}
            setSelectedCategory={setSelectedCategory}
          />
          <Input
            type="text"
            placeholder="0x..."
            label="Contract Address"
            description="This is the contract address previously deployed"
            onChange={(event: React.ChangeEvent<HTMLInputElement>) => setSelectedContract(event.target.value)}
          />
          <input type="submit" value="Load" />
        </form>
      </fieldset>
    </>
  )
}

export default LoadContract