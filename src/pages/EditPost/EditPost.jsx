import styles from './EditPost.module.css'

import { useEffect, useState } from 'react'
import {useNavigate, useParams} from 'react-router-dom'
import {useAuthValue} from '../../context/AuthContext'
import {useUpdateDocument} from '../../hooks/useUpdateDocument'
import {useFetchDocument} from '../../hooks/useFetchDocument'

const EditPost = () => {

  const {id} = useParams()
  const {document: post} = useFetchDocument("posts", id)

  const [title, setTitle] = useState("")
  const [image, setImage] = useState("")
  const [body, setBody] = useState("")
  const [tags, setTags] = useState("")
  const [formError, setFormError] = useState("")
  const {updateDocument, response} = useUpdateDocument("posts")
  const {user} = useAuthValue()

  const navigate = useNavigate()

  const handleSubmit = (e) => {
    e.preventDefault()
    setFormError("")
    
    //validate Image URL
    try {
      new URL(image)
    } catch (error) {
      setFormError("A imagem precisa ser uma URL.")
    }
    // criar array de tags
    const tagsArray = tags.split(",").map((tag) => tag.trim().toLowerCase());
    //checar todos os valores

    if(!title || !image || !tags || !body){
      setFormError("Por favor, preencha todos os campos!")
    }

    if(formError) return;

    const data = {
      title,
      image,
      body,
      tagsArray,
      uid: user.uid,
      createdBy: user.displayName
    }

    updateDocument(id, data)

    //redirect to home page
    navigate("/dashboard ")
  }

  useEffect(() => {
    
    if(post){
      setImage(post.image)
      setTitle(post.title)
      setBody(post.body)

      const textTags = post.tagsArray.join(", ")

      setTags(textTags)
    }
  }, [post])

  return (
    <div className={styles.editPost}>
        <h2>Editando post: {title}</h2>
        <p>Altere os dados do post como desejar</p>
        {post && (
          <>
            <form onSubmit={handleSubmit}>
            <label>
              <span>Título:</span>
              <input 
                type="text" 
                name='title' 
                required
                placeholder='Pense num bom título...' 
                value={title}
                onChange={(e) => setTitle(e.target.value)}  
              />
            </label>
            <label>
              <span>URL da imagem:</span>
              <input 
                type="text" 
                name='image' 
                required
                placeholder='Insira uma imagem que representa o seu post.' 
                value={image}
                onChange={(e) => setImage(e.target.value)}  
              />
              <p className={styles.previewTitle}>Preview da imagem atual: </p>
              <img className={styles.imagePreview} src={image} alt={title} />
            </label>
            <label>
              <span>Conteúdo:</span>
              <textarea 
                name="body"
                required
                placeholder='Insira o conteúdo do post'
                onChange={(e) => setBody(e.target.value)}
                value={body}
                autoComplete='false'
              ></textarea>
            </label>
            <label>
              <span>Tags:</span>
              <input 
                type="text" 
                name='tags' 
                required
                placeholder='Insira as tags separadas por vírgula' 
                value={tags}
                onChange={(e) => setTags(e.target.value)}  
              />
            </label>
            {!response.loading && <button className="btn">Cadastrar</button>}
            {response.loading && <button className="btn" disabled>Aguarde...</button>}
            {response.error && <p className="error">{response.error}</p>}
            {formError && <p className="error">{formError}</p>}
          </form>
          </>
        )}
    </div>
  )
}

export default EditPost