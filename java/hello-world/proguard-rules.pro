-injars build/classes
-injars node_modules(**/dist/*.jar;!META-INF/MANIFEST.MF)
-libraryjars  <java.home>/lib/rt.jar

-outjars build/out.jar

-printmapping build/out.map

-keep public class laat.MyMain {
    static void main(java.lang.String[]);
}
-dontobfuscate
