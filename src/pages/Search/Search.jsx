import styles from "./Search.module.css"

//components
import { Link } from "react-router-dom";
import PostDetail from "../../components/PostDetail";

//Hooks
import { useQuery } from "../../hooks/useQuery"
import { useFetchDocument } from "../../hooks/useFetchDocuments"

const Search = () => {
    const query = useQuery();
    const search = query.get("q");
    
    const {documents: posts} = useFetchDocument("posts", search)

    return (
    <div className={styles.searchContainer}>
        <h2>Search</h2>
        <div>
            {posts && posts.length === 0 && (
                <>
                    <p>Não foram encontrados posts a partir da sua busca...</p>
                    <Link to="/" className="btn btn-dark">Voltar</Link>
                </>
            )}
            {posts && posts.map((post) => (
                <PostDetail key={post.id} post={post}/>
            ))}
        </div>
    </div>
    )
}

export default Search