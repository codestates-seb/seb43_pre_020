import { useState } from 'react'
import MDEditor from '@uiw/react-md-editor'

export default function Ask() {
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')

  const onSubmit = e => {
    e.preventDefault()
  }

  return (
    <>
      <h2>Ask a public question</h2>
      <form onSubmit={onSubmit}>
        <div>
          <h3>Title</h3>
          <p>{`Be specific and imagine you're asking a question to another person`}</p>
          <input type='text' className='title-input' value={title} onChange={setTitle} />
        </div>
        <div>
          <h3>Body</h3>
          <p>
            The body of your question contains your problem details and results. Minimum 30
            characters.
          </p>
          <MDEditor value={content} onChange={setContent} preview='edit' />
          {/* <MDEditor.Markdown style={{ padding: 10 }} source={content} /> */}
        </div>
        <button type='submit'>Post your question</button>
      </form>
    </>
  )
}
