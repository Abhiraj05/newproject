from models import model

sentences = [
    "The weather is lovely today.",
    "It's so sunny outside!",
    "He drove to the stadium.",
]

embeddings = model.encode(sentences)
print(embeddings.shape)

query= [
    "The wather is lovely because yesterday in stadium it is sunny"
]
query_embedding = model.encode(query)

similarities = model.similarity(query_embedding,embeddings)
print(similarities)