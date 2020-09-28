// A resolver is a collection of functions that helps generating a response from a GraphQL query.
// It handles the request and returns a response.
// And every query or mutation name has to match exactly the name of the resolver function.
// That means, if we have a query named articles, we should have an articles() resolver function.

const Article = require('../../models/article');

module.exports = {
  articles: async () => {
    try {
      const articlesFetched = await Article.find();
      return articlesFetched.map(article => {
        return {
          ...article._doc,
          _id: article.id,
          createdAt: new Date(article._doc.createdAt).toISOString(),
        };
      });
    } catch (error) {
      throw error;
    }
  },

  createArticle: async args => {
    try {
      const { title, body } = args.article;
      const article = new Article({
        title,
        body,
      });
      const newArticle = await article.save();
      return { ...newArticle._doc, _id: newArticle.id };
    } catch (error) {
      throw error;
    }
  },
};

//The response sent by MongoDB has some metadata that's why for both functions, we return the _doc property directly.
