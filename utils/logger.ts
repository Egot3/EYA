//shout out to deepseek for giving the idea
//inspired by web status codes
export default function logger(message: any, statusCode:number=1){
	switch statusCode{
		case 100:
			print("[INFO]", message)
			break
		case 200:
			print("[TRACE]", message)
			break
		case 300:
			print("[DEBUG]", message)
			break
		case 400:
			print("[WARNING]", message)
			break
		case 500:
			print("[ERROR]", message)
	}
}
