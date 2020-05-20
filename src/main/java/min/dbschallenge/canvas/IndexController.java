package min.dbschallenge.canvas;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import java.util.Arrays;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Controller
public class IndexController {

    @GetMapping("/")
    public String index(){
        return "index";
    }

    @GetMapping("/toolbars")
    @ResponseBody
    public Map<String, Object> getToolbars(){
        Canvas canvas = new Canvas();
        canvas.setWidth(800);
        canvas.setHeight(600);

        List<String> toolbars = Arrays.asList("btnScissor", "btnEraser", "btnGlue");
        Map<String, Object> map = new HashMap<>();
        map.put("canvas", canvas);
        map.put("toolbars", toolbars);
        return map;
    }
}
