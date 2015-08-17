package edu.zju.cims201.GOF.springsecurity;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import org.springframework.security.web.authentication.SimpleUrlAuthenticationSuccessHandler;



/**
 * 从客户端传入的URL，在完成授权后，由本类处理URL跳转
 * @author zju
 *
 */

public class ClientTargetUrlRequestHandler extends SimpleUrlAuthenticationSuccessHandler {
	
	
		
		  public ClientTargetUrlRequestHandler() {
			  super();
		    }

	    
		public ClientTargetUrlRequestHandler(String defaultTargetUrl) {
		    super(defaultTargetUrl);
		}
		
		
		@Override
		protected String determineTargetUrl(HttpServletRequest request, HttpServletResponse response) {
			String targetUrl=super.determineTargetUrl(request, response);
			targetUrl=ChineseURLStringConverter.converter(targetUrl);
			return targetUrl;
		}
		
		


	

	
	
	

	        

}
