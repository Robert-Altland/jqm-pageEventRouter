using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Optimization;

namespace PageEventRouter
{
    public class BundleConfig
    {
        public static void RegisterBundles(BundleCollection bundles)
        {
#if OPTIMIZE
            BundleTable.EnableOptimizations = true;
#else
            BundleTable.EnableOptimizations = false;
#endif
            // TODO: IncludeDirectory for views, need to determine the right filter.
            // *.js is too broad and *.min.js breaks bundling because TypeScript minification doesn't seem to be compatible
            // TODO: Configure bundles to image references aren't broken.
            var scripts = new ScriptBundle("~/bundles/script")
                .Include("~/Scripts/jquery.min.js")
                .Include("~/Scripts/framework/pageEventRouter.js")
                .Include("~/Scripts/views/firstPage.js")
                .Include("~/Scripts/views/secondPage.js")
                .Include("~/Scripts/jquery.mobile.min.js");
            var styles = new StyleBundle("~/bundles/css")
                .Include("~/Content/jquery.mobile.min.css", "~/Content/Site.css");

            bundles.Add(styles);
            bundles.Add(scripts);
        }
    }
}