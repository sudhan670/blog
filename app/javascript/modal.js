form.addEventListener("submit", function (event) {
    event.preventDefault();
  
    const postId = document.getElementById("postId").value;
    const updatedTitle = document.getElementById("postTitle").value;
    const updatedContent = document.getElementById("postContent").value;
  
    fetch(`/posts/${postId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "X-CSRF-Token": document.querySelector('meta[name="csrf-token"]').content
      },
      body: JSON.stringify({ post: { title: updatedTitle, content: updatedContent } })
    })
    .then(response => response.json())
    .then(data => {
      modal.style.display = "none";
  
      // Dynamically update the post card content
      const postCard = document.querySelector(`[data-id="${postId}"]`);
      postCard.querySelector(".post-title").textContent = data.title;
      postCard.querySelector(".post-content").textContent = data.content;
      postCard.querySelector(".post-author").textContent = `By ${data.author}`;  // Ensure author is updated
  
    })
    .catch(error => console.error("Error updating post:", error));
  });
  