//Permet d'éviter la répétion de bloc try/catch 
const catchAsync = (fn) => {
    return (req, res, next) => {
        Promise.resolve(fn(req, res, next)).catch(next)
    }
}

export default catchAsync;